/**
 * premium-pdf.js
 * ─────────────────────────────────────────────────────────────────────────────
 * An advanced PDF converter for IITM Course Pages.
 *
 * Implements:
 *  1. Math Deduplication: Hides .katex-mathml to fix "double math" issues.
 *  2. Layout Cleanup: Hides sidebar menus, headers, and navigation UI.
 *  3. Premium Styling: Injects a print-focused CSS theme for high-quality layout.
 *  4. Widows/Orphans fix: Uses CSS to prevent content being split awkwardly.
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
const OUTPUT_DIR  = getArg('--output', path.resolve(__dirname, '../output/premium-pdf/Mathematics-II'));
const CONCURRENCY = parseInt(getArg('--concurrency', '4'), 10);
const FORCE       = hasFlag('--force');
const isCI        = !!process.env.CI;

const executablePath = isCI ? undefined : (
  process.platform === 'win32'  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' :
  process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' :
  '/usr/bin/google-chrome'
);

// ─── PREMIUM PRINT THEME ───────────────────────────────────────────────────
const PRINT_CSS = `
  /* 🎨 Premium Print Theme */

  /* Hide raw MathML that causes doubling */
  .katex-mathml, .sr-only {
    display: none !important;
  }

  /* Hide UI junk */
  header, footer, nav, 
  .modules__content-head, 
  .modules__content-head-menu, 
  .modules__content-head-close,
  .assignment-header,
  app-header,
  button, 
  .mat-icon,
  .app-icon {
    display: none !important;
  }

  /* Clean up page container */
  body, .page, content, .modules, .modules__content {
    margin: 0 !important;
    padding: 0 !important;
    background: white !important;
    box-shadow: none !important;
  }

  .modules__content-main {
    padding: 20px !important;
    max-width: 100% !important;
  }

  /* Typography */
  body {
    font-family: 'Roboto', 'Inter', -apple-system, sans-serif !important;
    color: #1a1a1a !important;
    font-size: 11pt !important;
    line-height: 1.6 !important;
  }

  h1 { font-size: 24pt !important; margin-bottom: 30px !important; color: #111 !important; border-bottom: 2px solid #eee; padding-bottom: 10px; }
  h2 { font-size: 18pt !important; margin-top: 25px !important; color: #333 !important; }

  /* Better math rendering */
  .katex-display {
    margin: 1.5em 0 !important;
  }
  .katex {
    font-size: 1.1em !important;
  }

  /* Prevent page breaks inside questions */
  .gcb-assessment-body > div, 
  .assignment-content > div {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    margin-bottom: 20px !important;
  }

  /* Ensure images match paper width */
  img {
    max-width: 100% !important;
    height: auto !important;
  }

  /* Links */
  a { text-decoration: none !important; color: #004d40 !important; }
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

const MIME = {
  css: 'text/css', woff2: 'font/woff2', png: 'image/png', 
  jpg: 'image/jpeg', jpeg: 'image/jpeg', svg: 'image/svg+xml'
};

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
    const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 90000 });

    // Inject our Premium Print Theme
    await page.addStyleTag({ content: PRINT_CSS });

    // Wait for KaTeX to finish rendering
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
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
      displayHeaderFooter: true,
      headerTemplate: `<div style="font-size:9px; width:100%; text-align:right; border-bottom:1px solid #eee; padding-bottom:4px; margin: 0 15mm; color:#666;">${baseName}</div>`,
      footerTemplate: `<div style="font-size:9px; width:100%; text-align:center; margin:0 15mm; padding-top:4px; color:#666;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
    });

    await page.close();
    console.log(`  ✨ [Premium] ${rel}`);
    return { success: true };
  } catch (err) {
    console.error(`  ❌ Failed: ${rel} - ${err.message}`);
    return { error: err };
  }
}

// ─── RUNNER ───────────────────────────────────────────────────────────────────

(async () => {
  console.log('\n🎨 Launching Premium PDF Converter...\n');
  const files = collectFiles(INPUT_PATH);
  if (!files.length) return console.log('No files found.');

  const browser = await puppeteer.launch({ 
    headless: 'new', executablePath, 
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] 
  });

  let cursor = 0;
  async function worker() {
    while (cursor < files.length) await renderPdf(files[cursor++], browser);
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker));
  
  await browser.close();
  console.log('\nDone! 🌈\n');
})().catch(err => { console.error(err); process.exit(1); });
