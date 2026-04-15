/**
 * extract-to-markdown.js
 * ─────────────────────────────────────────────────────────────────────────────
 * The "Academic Extractor" for IITM Course Pages.
 *
 * This script transforms SingleFileZ HTML archives into clean Markdown files,
 * preserving:
 *  1. Math: Converts KaTeX/HTML to raw LaTeX ($...$).
 *  2. Images: Extracts images from the ZIP and updates Markdown links.
 *  3. Structure: Maintains questions, points, and instructions.
 *
 * Usage: npm run extract
 */

const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { JSDOM } = require('jsdom');

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const IS_CI = process.env.GITHUB_ACTIONS === 'true';
const INPUT_DIR = path.resolve(__dirname, '../content');

// Dynamic Output: Locally use 'handouts/', in CI use 'markdown/extracted/' for web sync
const OUTPUT_DIR = IS_CI 
  ? path.resolve(__dirname, '../markdown/extracted')
  : path.resolve(__dirname, '../handouts');

const ASSETS_DIR = path.join(OUTPUT_DIR, 'assets');

// Ensure directories exist
[OUTPUT_DIR, ASSETS_DIR].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// ─── UTILS ────────────────────────────────────────────────────────────────────

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

/**
 * Clean up HTML formatting for Markdown conversion
 */
function htmlToMd(node) {
  if (node.nodeType === 3) return node.textContent; // Text node
  if (node.nodeType !== 1) return ''; // Skip other types

  let content = '';
  node.childNodes.forEach(child => { content += htmlToMd(child); });

  const tag = node.tagName.toLowerCase();
  switch (tag) {
    case 'b': case 'strong': return `**${content}**`;
    case 'i': case 'em': return `*${content}*`;
    case 'h1': return `\n# ${content}\n`;
    case 'h2': return `\n## ${content}\n`;
    case 'h3': return `\n### ${content}\n`;
    case 'p': return `\n${content}\n`;
    case 'br': return '\n';
    case 'li': return `- ${content}\n`;
    case 'ul': return `\n${content}\n`;
    case 'img': 
      const alt = node.getAttribute('alt') || 'image';
      const src = node.getAttribute('src');
      return `\n![${alt}](${src})\n`;
    case 'a':
      const href = node.getAttribute('href');
      return `[${content}](${href})`;
    default: return content;
  }
}

// ─── PROCESSOR ───────────────────────────────────────────────────────────────

// ─── INDEXING TRACKER ────────────────────────────────────────────────────────
const navItems = [];
const searchDocs = [];

async function processArchive(filePath) {
  const rel = path.relative(INPUT_DIR, filePath);
  const outDir = path.join(OUTPUT_DIR, path.dirname(rel));
  const baseName = path.basename(filePath, '.u.zip.html').replace(/[<>:"/\\|?*]/g, '_');
  const outFile = path.join(outDir, `${baseName}.md`);
  
  // Navigation Path (e.g., extracted/Course/Week/File)
  const entryRelative = path.relative(OUTPUT_DIR, outFile).replace(/\\/g, '/');
  const pathWithoutExt = entryRelative.replace(/\.md$/, '');

  console.log(`📖 Processing: ${rel}`);
  
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  try {
    const zip = new AdmZip(filePath);
    const htmlEntry = zip.getEntry('index.html');
    if (!htmlEntry) return;

    const html = htmlEntry.getData().toString('utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // 1. MATH CONVERSION: KaTeX -> LaTeX
    const katexBlocks = document.querySelectorAll('.katex');
    katexBlocks.forEach(k => {
      const annotation = k.querySelector('annotation[encoding="application/x-tex"]');
      if (annotation) {
        const tex = annotation.textContent.trim();
        const isDisplay = k.closest('.katex-display') !== null;
        const replacement = isDisplay ? `\n$$\n${tex}\n$$\n` : `$${tex}$`;
        const span = document.createElement('span');
        span.textContent = replacement;
        k.parentNode.replaceChild(span, k);
      }
    });

    // 2. IMAGE EXTRACTION
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('data:') && !src.startsWith('http')) {
        const imgEntry = zip.getEntry(src) || zip.getEntry(`frames/0/${src}`);
        if (imgEntry) {
          const imgExt = path.extname(src);
          const imgName = `img_${Math.random().toString(36).substr(2, 9)}${imgExt}`;
          const imgPath = path.join(ASSETS_DIR, imgName);
          fs.writeFileSync(imgPath, imgEntry.getData());
          const relativeAssetPath = path.relative(outDir, ASSETS_DIR).replace(/\\/g, '/') + '/' + imgName;
          img.setAttribute('src', relativeAssetPath);
        }
      }
    });

    // 3. CONTENT EXTRACTION
    const contentArea = document.querySelector('.gcb-assessment-body') || 
                        document.querySelector('.assignment-content') ||
                        document.querySelector('content') ||
                        document.body;

    const trash = contentArea.querySelectorAll('button, .mat-icon, script, style, .sr-only, .qt-warning');
    trash.forEach(t => t.remove());

    let markdown = `# ${baseName}\n\n`;
    contentArea.childNodes.forEach(child => { markdown += htmlToMd(child); });
    markdown = markdown.replace(/\n{3,}/g, '\n\n').trim();

    fs.writeFileSync(outFile, markdown);
    
    // Add to real-time index
    searchDocs.push({
      id: entryRelative,
      title: baseName,
      snippet: markdown.substring(0, 150).replace(/\n/g, ' ') + '...',
      source: 'extracted',
      path: pathWithoutExt
    });

    console.log(`✅ Extracted & Indexed: ${baseName}`);
    dom.window.close();

  } catch (err) {
    console.error(`❌ Failed: ${rel} - ${err.message}`);
  }
}

// ─── RUNNER ───────────────────────────────────────────────────────────────────

(async () => {
  console.log('\n📝 Launching Unified IITM Extractor & Indexer...\n');
  
  const files = collectFiles(INPUT_DIR);
  if (!files.length) return console.log('No files found.');

  for (const f of files) {
    await processArchive(f);
  }
  
  // Save Temporary Index for the next step to merge
  const tempIndex = {
    timestamp: new Date().toISOString(),
    extractedDocs: searchDocs,
    stats: { extractedCount: searchDocs.length }
  };
  
  const indexPath = path.resolve(OUTPUT_DIR, '../extracted-index.tmp.json');
  fs.writeFileSync(indexPath, JSON.stringify(tempIndex, null, 2));

  console.log(`\n✨ Unified Step 1 Complete!`);
  console.log(`📊 Extracted and Indexed: ${searchDocs.length} documents\n`);
})().catch(err => { console.error(err); process.exit(1); });
