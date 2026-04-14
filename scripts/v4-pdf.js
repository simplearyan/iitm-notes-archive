/**
 * v4-pdf.js
 * ─────────────────────────────────────────────────────────────────────────────
 * The "Compact" PDF converter for IITM Course Pages.
 *
 * Implements:
 *  1. Smart Page Breaks: Allows splitting of long questions while keeping small 
 *     elements like diagrams and formulas together.
 *  2. Margin Compression: Aggressively zeros out web-only margins/paddings.
 *  3. Vertical Packing: Squeezes space between question blocks for page efficiency.
 */

'use strict';

const fs        = require('fs');
const path      = require('path');
const AdmZip    = require('adm-zip');
const puppeteer = require('puppeteer');

// ─── CLI CONFIG ───────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const getArg  = (flag, def) => { const i = argv.indexOf(flag); return i !== -1 && argv[i + 1] ? argv[i + 1] : def; };
const hasFlag = (f) => argv.includes(f);

const INPUT_PATH  = getArg('--input',  path.resolve(__dirname, '../content/Term-Feb-to-May/Mathematics-II'));
const OUTPUT_DIR  = getArg('--output', path.resolve(__dirname, '../output/v4-pdf/Mathematics-II'));
const CONCURRENCY = parseInt(getArg('--concurrency', '4'), 10);
const FORCE       = hasFlag('--force');
const isCI        = !!process.env.CI;

const executablePath = isCI ? undefined : (
  process.platform === 'win32'  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' :
  process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' :
  '/usr/bin/google-chrome'
);

// ─── COMPACT PRINT THEME ─────────────────────────────────────────────────────
const PRINT_CSS = `
  /* 🏗️ Layout Unrolling */
  html, body, app-root, .mat-typography, app-courses, content, .page,
  .modules, .modules__content, .modules__content-main,
  app-course-modules, app-assessments, .assignment-content,
  #target, #assessmentContents, .gcb-assessment-body {
    height: auto !important;
    min-height: auto !important;
    max-height: none !important;
    overflow: visible !important;
    display: block !important;
    position: static !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* 📏 Aggressive Vertical Squeeze */
  .gcb-assessment-body, .assignment-content, .gcb-assessment-contents {
    padding: 0 !important;
    margin: 0 !important;
  }

  /* Question Wrappers */
  .gcb-assessment-body > div, 
  .assignment-content > div,
  .gcb-assessment-contents > div {
    margin: 0 !important;
    padding: 0 0 16px 0 !important; /* Tight spacing between items */
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 16px !important;
  }

  /* 🚫 Kill Math Duplication & UI */
  .katex-mathml, .sr-only, header, footer, nav, 
  .modules__content-head, button, app-header, .mat-icon, .app-icon {
    display: none !important;
  }

  /* 🎨 Compact Typography */
  body {
    font-family: 'Roboto', 'Inter', system-ui, sans-serif !important;
    color: #1a1a1a !important;
    font-size: 10.5pt !important; /* Slightly smaller for density */
    line-height: 1.5 !important;
  }

  h1 { font-size: 20pt !important; margin: 0 0 15px 0 !important; border-bottom: 1px solid #ddd; }
  h2 { font-size: 16pt !important; margin: 20px 0 10px 0 !important; }

  /* 🧠 Smart Breaks */
  /* Keep image + caption together, and small formulas together */
  figure, .katex-display, img, .inline-equation {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }

  /* Allow the main question containers to break if they are long */
  .gcb-assessment-body > div, 
  .assignment-content > div {
    page-break-inside: auto !important;
    break-inside: auto !important;
  }

  /* Images */
  img {
    max-width: 90% !important;
    height: auto !important;
    display: block !important;
    margin: 10px auto !important;
  }
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function collectFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.u.zip.html')) results.push(full);
  }
  return results;
}

const MIME = { css: 'text/css', woff2: 'font/woff2', png: 'image/png', jpg: 'image/jpeg', svg: 'image/svg+xml' };

function extractZip(filePath) {
  const zip = new AdmZip(filePath);
  const assets = {};
  let html = '';
  zip.getEntries().forEach(e => {
    if (e.entryName === 'index.html') html = e.getData().toString('utf8');
    else {
      const ext = path.extname(e.entryName).slice(1).toLowerCase();
      if (MIME[ext]) assets[e.entryName] = `data:${MIME[ext]};base64,${e.getData().toString('base64')}`;
    }
  });
  return { html, assets };
}

function inlineAssets(html, assets) {
  for (const [name, data] of Object.entries(assets)) {
    html = html.split(name).join(data); 
  }
  return html;
}

// ─── RENDERER ─────────────────────────────────────────────────────────────────

async function renderPdf(filePath, browser) {
  const rel = path.relative(INPUT_PATH, filePath);
  const outDir = path.join(OUTPUT_DIR, path.dirname(rel));
  const baseName = path.basename(filePath, '.u.zip.html').replace(/[<>:"/\\|?*]/g, '_');
  const outFile = path.join(outDir, `${baseName}.pdf`);

  if (!FORCE && fs.existsSync(outFile)) return { skipped: true };
  fs.mkdirSync(outDir, { recursive: true });

  try {
    let { html, assets } = extractZip(filePath);
    html = inlineAssets(html, assets);

    const page = await browser.newPage();
    await page.setViewport({ width: 1100, height: 1600 });
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });

    await page.addStyleTag({ content: PRINT_CSS });

    await page.evaluate(() => new Promise(r => {
      const check = () => {
        if (window.MathJax?.startup?.promise) return window.MathJax.startup.promise.then(r);
        if (window.MathJax?.Hub) return window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, null, r]);
        setTimeout(r, 2000); 
      };
      check();
    }));

    await page.pdf({
      path: outFile,
      format: 'A4',
      printBackground: true,
      margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' },
      displayHeaderFooter: true,
      headerTemplate: `<div style="font-size:7px; width:100%; text-align:right; margin: 0 15mm; color:#ccc;">${baseName}</div>`,
      footerTemplate: `<div style="font-size:7px; width:100%; text-align:center; margin:0 15mm; color:#ccc;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
    });

    await page.close();
    console.log(`  📏 [v4-Compact] ${rel}`);
    return { success: true };
  } catch (err) {
    console.error(`  ❌ Failed: ${rel} - ${err.message}`);
    return { error: err };
  }
}

// ─── RUNNER ───────────────────────────────────────────────────────────────────

(async () => {
  console.log('\n📏 Launching v4 Compact PDF Converter...\n');
  const stats = fs.statSync(INPUT_PATH);
  const files = stats.isFile() ? [INPUT_PATH] : collectFiles(INPUT_PATH);
  
  const browser = await puppeteer.launch({ 
    headless: 'new', executablePath, 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });

  let cursor = 0;
  async function worker() {
    while (cursor < files.length) await renderPdf(files[cursor++], browser);
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker));
  await browser.close();
  console.log('\nv4 Compact Render Complete! ✨\n');
})().catch(err => { console.error(err); process.exit(1); });
