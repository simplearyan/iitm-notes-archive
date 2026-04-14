/**
 * v3-pdf.js
 * ─────────────────────────────────────────────────────────────────────────────
 * The "Ultra" PDF converter for IITM Course Pages.
 *
 * Implements:
 *  1. Layout Unrolling: Forces height:auto and overflow:visible on all Angular
 *     containers to enable multi-page PDF generation.
 *  2. Math Deduplication: Fixes duplicated MathML text.
 *  3. UI Purge: Removes menu buttons, sidebars, and interactive site elements.
 *  4. High-Quality Typography: Injects Roboto/Inter for a professional look.
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
const OUTPUT_DIR  = getArg('--output', path.resolve(__dirname, '../output/v3-pdf/Mathematics-II'));
const CONCURRENCY = parseInt(getArg('--concurrency', '4'), 10);
const FORCE       = hasFlag('--force');
const isCI        = !!process.env.CI;

const executablePath = isCI ? undefined : (
  process.platform === 'win32'  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' :
  process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' :
  '/usr/bin/google-chrome'
);

// ─── ULTRA PRINT THEME ───────────────────────────────────────────────────────
const PRINT_CSS = `
  /* 🏗️ Layout Unrolling (CRITICAL for Multi-page) */
  html, body, 
  app-root, .mat-typography,
  app-courses, content, .page,
  .modules, .modules__content, .modules__content-main,
  app-course-modules, app-assessments, .assignment-content,
  #target, #assessmentContents, .gcb-assessment-body {
    height: auto !important;
    min-height: auto !important;
    max-height: none !important;
    overflow: visible !important;
    overflow-y: visible !important;
    display: block !important;
    position: static !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* 🚫 Kill Math Duplication */
  .katex-mathml, .sr-only, [aria-hidden="true"].katex-html + .katex-mathml {
    display: none !important;
  }

  /* 🧹 Purge UI Junk */
  header, footer, nav, 
  .modules__content-head, 
  .modules__content-head-menu, 
  .modules__content-head-close,
  button, app-header, .mat-icon, .app-icon,
  .assignment-header, .gcb-assessment-title.sf-hidden {
    display: none !important;
  }

  /* 🎨 Premium Styling */
  body {
    font-family: 'Roboto', 'Inter', system-ui, sans-serif !important;
    color: #1a1a1a !important;
    font-size: 11pt !important;
    line-height: 1.6 !important;
    background: white !important;
  }

  .modules__content-main {
    padding: 30px !important;
  }

  h1 { font-size: 24pt !important; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 25px; }
  h2 { font-size: 18pt !important; margin-top: 30px !important; color: #222; }

  /* 🧩 Better Question Spacing */
  .gcb-assessment-body > div, 
  .assignment-content > div,
  .gcb-assessment-contents > div {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    margin-bottom: 30px !important;
  }

  /* 🖼️ Sharp Images */
  img {
    max-width: 100% !important;
    height: auto !important;
    display: block !important;
    margin: 15px auto !important;
  }

  /* 🔗 Links */
  a { text-decoration: none !important; color: #00796b !important; font-weight: 500; }
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
    // Use a large viewport to ensure elements are positioned correctly before print
    await page.setViewport({ width: 1200, height: 1600 });
    
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 120000 });

    // Inject our Ultra Print Theme
    await page.addStyleTag({ content: PRINT_CSS });

    // Wait for MathJax/KaTeX
    await page.evaluate(() => new Promise(r => {
      const check = () => {
        if (window.MathJax?.startup?.promise) return window.MathJax.startup.promise.then(r);
        if (window.MathJax?.Hub) return window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, null, r]);
        setTimeout(r, 2500); 
      };
      check();
    }));

    await page.pdf({
      path: outFile,
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
      displayHeaderFooter: true,
      headerTemplate: `<div style="font-size:8px; width:100%; text-align:right; margin: 0 15mm; color:#aaa;">${baseName}</div>`,
      footerTemplate: `<div style="font-size:8px; width:100%; text-align:center; margin:0 15mm; color:#aaa;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
    });

    await page.close();
    console.log(`  🚀 [v3-MultiPage] ${rel}`);
    return { success: true };
  } catch (err) {
    console.error(`  ❌ Failed: ${rel} - ${err.message}`);
    return { error: err };
  }
}

// ─── RUNNER ───────────────────────────────────────────────────────────────────

(async () => {
  console.log('\n🚀 Launching v3 Multi-Page PDF Converter...\n');
  
  // Decide if we are converting one file or a directory
  const stats = fs.statSync(INPUT_PATH);
  const files = stats.isFile() ? [INPUT_PATH] : collectFiles(INPUT_PATH);
  
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
  console.log('\nv3 Render Complete! 🌈\n');
})().catch(err => { console.error(err); process.exit(1); });
