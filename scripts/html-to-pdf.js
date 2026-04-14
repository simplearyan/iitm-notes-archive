/**
 * html-to-pdf.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Converts IITM SingleFileZ (.u.zip.html) archives to PDF using Puppeteer.
 *
 * Each .u.zip.html is a ZIP containing index.html + embedded CSS / fonts.
 * This script extracts the inner HTML, inlines all assets as data-URIs, feeds
 * it to headless Chrome, waits for MathJax / KaTeX, then saves a PDF.
 *
 * Local (Windows):  uses C:\Program Files\Google\Chrome\Application\chrome.exe
 * CI (GitHub Actions): uses the Chromium that ships with `puppeteer` (no extra
 *                       download needed because we install puppeteer there).
 *
 * Usage:
 *   node scripts/html-to-pdf.js
 *   node scripts/html-to-pdf.js --input  ./content/…/Mathematics-II
 *   node scripts/html-to-pdf.js --output ./output/pdf/Mathematics-II
 *   node scripts/html-to-pdf.js --week   1               # only Week 1
 *   node scripts/html-to-pdf.js --concurrency 4
 *   node scripts/html-to-pdf.js --force                  # re-render existing
 *
 * NPM script (added to package.json):
 *   "pdf":       "node scripts/html-to-pdf.js"
 *   "pdf:force": "node scripts/html-to-pdf.js --force"
 */

'use strict';

const fs        = require('fs');
const path      = require('path');
const AdmZip    = require('adm-zip');
const puppeteer = require('puppeteer');

// ─── CLI ──────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const getArg  = (flag, def) => { const i = argv.indexOf(flag); return i !== -1 && argv[i + 1] ? argv[i + 1] : def; };
const hasFlag = (f) => argv.includes(f);

const INPUT_PATH  = getArg('--input',       path.resolve(__dirname, '../content/Term-Feb-to-May/Mathematics-II'));
const OUTPUT_DIR  = getArg('--output',      path.resolve(__dirname, '../output/pdf/Mathematics-II'));
const WEEK_FILTER = getArg('--week',        null);
const CONCURRENCY = parseInt(getArg('--concurrency', '3'), 10);
const FORCE       = hasFlag('--force');

// ─── Chrome path (mirrors generate-preview.js pattern) ───────────────────────
// In CI (GitHub Actions) the environment variable CI is set to "true".
// Puppeteer bundles its own Chromium in CI, so executablePath is left undefined.
// Locally on Windows we point to the already-installed system Chrome.
const isCI = !!process.env.CI;

const LOCAL_CHROME = {
  win32:  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  linux:  '/usr/bin/google-chrome',
};

const executablePath = isCI
  ? undefined                              // let Puppeteer use bundled Chromium
  : (LOCAL_CHROME[process.platform] ?? undefined);

// ─── File collector ───────────────────────────────────────────────────────────
function collectFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (WEEK_FILTER && !entry.name.toLowerCase().includes(WEEK_FILTER.toLowerCase())) continue;
      results.push(...collectFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.u.zip.html')) {
      results.push(full);
    }
  }
  return results;
}

// ─── ZIP extraction ────────────────────────────────────────────────────────────
const MIME = {
  css: 'text/css', woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf',
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif',
  svg: 'image/svg+xml', ico: 'image/x-icon', js: 'text/javascript',
};

function extractZip(filePath) {
  const zip    = new AdmZip(filePath);
  const assets = {};
  let   html   = '';

  for (const entry of zip.getEntries()) {
    const name = entry.entryName;
    if (name === 'index.html') {
      html = entry.getData().toString('utf8');
    } else {
      const ext  = path.extname(name).slice(1).toLowerCase();
      const mime = MIME[ext];
      if (mime) assets[name] = `data:${mime};base64,${entry.getData().toString('base64')}`;
    }
  }
  return { html, assets };
}

function inlineAssets(html, assets) {
  for (const [name, dataUri] of Object.entries(assets)) {
    const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html
      .replace(new RegExp(`(href=["'])${esc}(["'])`, 'g'),  (m) => m.replace(name, dataUri))
      .replace(new RegExp(`(src=["'])${esc}(["'])`,  'g'),  (m) => m.replace(name, dataUri))
      .replace(new RegExp(`url\\(["']?${esc}["']?\\)`, 'g'), (m) => m.replace(name, dataUri));
  }
  return html;
}

const safeName = (s) => s.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_').trim();

// ─── Render one file ──────────────────────────────────────────────────────────
async function convertToPdf(filePath, browser) {
  const rel      = path.relative(INPUT_PATH, filePath);
  const outDir   = path.join(OUTPUT_DIR, path.dirname(rel));
  const baseName = safeName(path.basename(filePath, '.u.zip.html'));
  const outFile  = path.join(outDir, baseName + '.pdf');

  if (!FORCE && fs.existsSync(outFile)) {
    console.log(`  ⏭  Skip (exists): ${rel}`);
    return { skipped: true };
  }

  fs.mkdirSync(outDir, { recursive: true });

  let html, assets;
  try {
    ({ html, assets } = extractZip(filePath));
  } catch (err) {
    console.error(`  ❌ ZIP extract failed: ${rel} — ${err.message}`);
    return { error: err };
  }

  html = inlineAssets(html, assets);
  // Remove canonical links (Puppeteer doesn't need them)
  html = html.replace(/<link[^>]+rel=["']?canonical["']?[^>]*>/gi, '');

  const page = await browser.newPage();
  try {
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60_000 });

    // Wait for MathJax (v2 or v3) if present
    await page.evaluate(() => new Promise((resolve) => {
      if (window.MathJax) {
        const mj = window.MathJax;
        if (mj.startup?.promise)             return mj.startup.promise.then(resolve);
        if (mj.Hub)                          return mj.Hub.Queue(['Typeset', mj.Hub, null, resolve]);
      }
      setTimeout(resolve, 1200); // let any late scripts settle
    }));

    await page.pdf({
      path:                outFile,
      format:              'A4',
      printBackground:     true,
      margin:              { top: '14mm', bottom: '14mm', left: '12mm', right: '12mm' },
      displayHeaderFooter: true,
      headerTemplate:      `<div style="font-size:8px;width:100%;text-align:center;color:#999;padding-top:4px;">${baseName}</div>`,
      footerTemplate:      `<div style="font-size:8px;width:100%;text-align:center;color:#999;padding-bottom:4px;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
    });

    console.log(`  ✅ ${rel}`);
    return { success: true, file: outFile };
  } catch (err) {
    console.error(`  ❌ Render failed: ${rel} — ${err.message}`);
    return { error: err };
  } finally {
    await page.close();
  }
}

// ─── Concurrency pool (same pattern as generate-preview) ──────────────────────
async function runPool(files, browser) {
  const results = [];
  let    cursor = 0;

  async function worker() {
    while (cursor < files.length) {
      const f = files[cursor++];
      results.push(await convertToPdf(f, browser));
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker));
  return results;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log(  '║       IITM SingleFileZ → PDF  (Puppeteer / headless)    ║');
  console.log(  '╚══════════════════════════════════════════════════════════╝\n');

  if (executablePath) console.log(`🖥  Using local Chrome: ${executablePath}`);
  else                console.log(`🤖 CI mode — using Puppeteer bundled Chromium`);

  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`❌ --input path not found: ${INPUT_PATH}`);
    process.exit(1);
  }

  const stat  = fs.statSync(INPUT_PATH);
  const files = stat.isFile()
    ? [INPUT_PATH]
    : collectFiles(INPUT_PATH);

  if (files.length === 0) { console.log('⚠️  No .u.zip.html files found.'); process.exit(0); }

  console.log(`📂 Input : ${INPUT_PATH}`);
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  if (WEEK_FILTER) console.log(`🔍 Filter: folders containing "${WEEK_FILTER}"`);
  console.log(`📄 Files : ${files.length}  |  concurrency: ${CONCURRENCY}  |  force: ${FORCE}\n`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('🚀 Launching headless Chrome …\n');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    const results = await runPool(files, browser);
    const ok      = results.filter(r => r?.success).length;
    const skipped = results.filter(r => r?.skipped).length;
    const failed  = results.filter(r => r?.error).length;

    console.log('\n─────────────────────────────────────────────────────');
    console.log(`✅ Converted : ${ok}`);
    console.log(`⏭  Skipped   : ${skipped}  (use --force to re-render)`);
    console.log(`❌ Failed    : ${failed}`);
    console.log(`📁 Output dir: ${OUTPUT_DIR}`);
  } finally {
    await browser.close();
  }

  console.log('\nDone! 🎉\n');
})().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
