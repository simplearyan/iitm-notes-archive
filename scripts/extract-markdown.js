#!/usr/bin/env node

/**
 * Markdown Extraction Script
 * 
 * Converts .u.zip.html SingleFileZ archives to markdown files
 * Mirrors the content/ folder structure to markdown/extracted/
 */

const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const { JSDOM } = require('jsdom');

// ============ Configuration ============
const CONTENT_ROOT = path.join(__dirname, '..', 'content');
const MARKDOWN_EXTRACTED = path.join(__dirname, '..', 'markdown', 'extracted');
const ASSETS_DIR = path.join(MARKDOWN_EXTRACTED, 'assets');

// File patterns to process
const ARCHIVE_PATTERN = /\.u\.zip\.html$/;

let processedCount = 0;
let skippedCount = 0;
let errorCount = 0;

// ============ Utilities ============

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Extract KaTeX/LaTeX math from HTML
 */
function extractMath(html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  let content = html;
  
  // Find all .katex elements with math annotations
  const mathElements = doc.querySelectorAll('.katex');
  mathElements.forEach(el => {
    const annotation = el.querySelector('annotation[encoding="application/x-tex"]');
    if (annotation) {
      const latex = annotation.textContent;
      // Determine if inline or display math based on context
      const isDisplay = el.classList.contains('display') || el.parentElement?.classList.contains('math-display');
      const tex = isDisplay ? `$$${latex}$$` : `$${latex}$`;
      content = content.replace(el.outerHTML, tex);
    }
  });
  
  return content;
}

/**
 * Extract images from ZIP and return updated content paths
 */
function extractImages(zipBuffer, outputDir) {
  const imageMap = {};
  
  try {
    const zip = new AdmZip(zipBuffer);
    const entries = zip.getEntries();
    let imageCount = 0;
    
    for (const entry of entries) {
      if (entry.isDirectory) continue;
      
      const fileName = entry.name.toLowerCase();
      if (!/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileName)) continue;
      
      try {
        // Extract to markdown/extracted/assets/
        const basename = path.basename(entry.name);
        const outputPath = path.join(outputDir, basename);
        const assetRelativePath = `assets/${basename}`;
        
        fs.writeFileSync(outputPath, entry.getData());
        imageMap[entry.name] = assetRelativePath;
        imageMap[basename] = assetRelativePath;
        
        // Also map without extension variations
        const withoutExt = basename.replace(/\.[^.]+$/, '');
        imageMap[withoutExt] = assetRelativePath;
        
        imageCount++;
      } catch (err) {
        // Skip individual image extraction errors
        continue;
      }
    }
    
    if (imageCount > 0) {
      console.log(`  📦 Extracted ${imageCount} images`);
    }
  } catch (err) {
    console.warn(`⚠️  Could not extract images from ZIP: ${err.message}`);
  }
  
  return imageMap;
}

/**
 * Convert HTML to Markdown
 */
function htmlToMarkdown(html, imageMap = {}) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  
  // Remove scripts, styles, nav, headers
  const toRemove = doc.querySelectorAll('script, style, nav, [role="navigation"], .navbar, .header, button, [data-ad-client]');
  toRemove.forEach(el => el.remove());
  
  // Get main content area
  let mainContent = doc.querySelector('.gcb-assessment-body') ||
                     doc.querySelector('.assessment-content') ||
                     doc.querySelector('main') ||
                     doc.querySelector('article') ||
                     doc.body;
  
  if (!mainContent) mainContent = doc.body;
  
  // Convert to markdown recursively
  let markdown = convertElement(mainContent, imageMap);
  
  // Clean up excessive whitespace
  markdown = markdown
    .replace(/\n\n\n+/g, '\n\n')
    .replace(/^\s+|\s+$/g, '');
  
  return markdown;
}

/**
 * Recursively convert DOM elements to markdown
 */
function convertElement(element, imageMap = {}) {
  let markdown = '';
  
  for (const node of element.childNodes) {
    if (node.nodeType === 3) { // Text node
      let text = node.textContent.trim();
      if (text) {
        // Preserve bold/italic context from parent
        const parent = node.parentElement;
        if (parent?.tagName === 'STRONG' || parent?.tagName === 'B') {
          text = `**${text}**`;
        } else if (parent?.tagName === 'EM' || parent?.tagName === 'I') {
          text = `*${text}*`;
        }
        markdown += text + '\n';
      }
    } else if (node.nodeType === 1) { // Element node
      const tag = node.tagName.toLowerCase();
      const text = node.textContent?.trim() || '';
      
      switch (tag) {
        case 'h1':
          markdown += `# ${node.textContent.trim()}\n\n`;
          break;
        case 'h2':
          markdown += `## ${node.textContent.trim()}\n\n`;
          break;
        case 'h3':
          markdown += `### ${node.textContent.trim()}\n\n`;
          break;
        case 'h4':
          markdown += `#### ${node.textContent.trim()}\n\n`;
          break;
        case 'h5':
          markdown += `##### ${node.textContent.trim()}\n\n`;
          break;
        case 'h6':
          markdown += `###### ${node.textContent.trim()}\n\n`;
          break;
        case 'p':
          markdown += text + '\n\n';
          break;
        case 'li':
          const indent = countParentLists(node);
          const prefix = '  '.repeat(indent - 1) + '- ';
          markdown += prefix + text + '\n';
          break;
        case 'blockquote':
          const lines = convertElement(node, imageMap).split('\n');
          markdown += lines.map(line => '> ' + line).join('\n') + '\n\n';
          break;
        case 'code':
          if (node.parentElement?.tagName === 'PRE') {
            // Code block
            markdown += `\`\`\`\n${text}\n\`\`\`\n\n`;
          } else {
            // Inline code
            markdown += `\`${text}\``;
          }
          break;
        case 'img':
          const src = node.getAttribute('src');
          const alt = node.getAttribute('alt') || 'image';
          const mappedSrc = imageMap[src] || src;
          markdown += `![${alt}](${mappedSrc})\n\n`;
          break;
        case 'table':
          markdown += convertTable(node) + '\n\n';
          break;
        case 'hr':
          markdown += '---\n\n';
          break;
        case 'br':
          markdown += '\n';
          break;
        default:
          // Recursively process children for unhandled tags
          if (node.children.length > 0) {
            markdown += convertElement(node, imageMap);
          } else if (text) {
            markdown += text + '\n';
          }
      }
    }
  }
  
  return markdown;
}

function countParentLists(node) {
  let count = 0;
  let parent = node.parentElement;
  while (parent) {
    if (parent.tagName === 'UL' || parent.tagName === 'OL') {
      count++;
    }
    parent = parent.parentElement;
  }
  return Math.max(1, count);
}

/**
 * Convert HTML table to markdown table
 */
function convertTable(tableElement) {
  const rows = tableElement.querySelectorAll('tr');
  if (rows.length === 0) return '';
  
  let markdown = '';
  let isHeader = true;
  
  rows.forEach((row, idx) => {
    const cells = row.querySelectorAll('th, td');
    const cellTexts = Array.from(cells).map(cell => cell.textContent.trim());
    
    markdown += '| ' + cellTexts.join(' | ') + ' |\n';
    
    if (isHeader) {
      markdown += '| ' + cellTexts.map(() => '---').join(' | ') + ' |\n';
      isHeader = false;
    }
  });
  
  return markdown;
}

/**
 * Process a single .u.zip.html file
 */
function processArchive(filePath, relativePath) {
  try {
    // Read ZIP buffer from embedded file
    const fileData = fs.readFileSync(filePath);
    
    // Determine output path
    const fileName = path.basename(filePath, '.u.zip.html');
    const dirName = path.dirname(relativePath);
    const outputDir = path.join(MARKDOWN_EXTRACTED, dirName);
    ensureDir(outputDir);
    
    // Extract images
    const imageMap = extractImages(fileData, ASSETS_DIR);
    
    // Extract HTML content
    const dom = new JSDOM(fileData.toString('utf-8'), {
      pretendToBeVisual: false,
      beforeParse(window) {
        // Disable resource loading to save memory
        window.fetch = () => {};
      }
    });
    const htmlContent = dom.window.document.body.innerHTML;
    
    // Convert to markdown
    const withMath = extractMath(htmlContent);
    const markdown = htmlToMarkdown(withMath, imageMap);
    
    // Create output markdown file
    const outputPath = path.join(outputDir, `${fileName}.md`);
    const frontmatter = `---\ntitle: ${fileName.replace(/_/g, ' ')}\ndate: ${new Date().toISOString()}\n---\n\n`;
    
    fs.writeFileSync(outputPath, frontmatter + markdown);
    
    console.log(`✅ ${relativePath} → ${path.relative(MARKDOWN_EXTRACTED, outputPath)}`);
    processedCount++;
    
    // Explicitly clean up DOM to free memory
    dom.window.close?.();
    
  } catch (err) {
    console.error(`❌ Error processing ${relativePath}: ${err.message}`);
    errorCount++;
  }
}

/**
 * Recursively find and process all .u.zip.html files
 */
function walkDirectory(dirPath, relativeBase = '') {
  if (!fs.existsSync(dirPath)) return;
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = relativeBase ? `${relativeBase}/${entry.name}` : entry.name;
    
    if (entry.isDirectory()) {
      walkDirectory(fullPath, relativePath);
    } else if (ARCHIVE_PATTERN.test(entry.name)) {
      processArchive(fullPath, relativePath);
      
      // Trigger garbage collection after each file to free memory
      if (global.gc) {
        global.gc();
      }
    }
  }
}

// ============ Main Execution ============

console.log('📦 Starting markdown extraction...\n');

ensureDir(MARKDOWN_EXTRACTED);
ensureDir(ASSETS_DIR);

walkDirectory(CONTENT_ROOT);

// Final garbage collection
if (global.gc) {
  global.gc();
}

console.log(`\n✨ Extraction complete:`);
console.log(`  ✅ Processed: ${processedCount}`);
console.log(`  ⏭️  Skipped: ${skippedCount}`);
console.log(`  ❌ Errors: ${errorCount}`);
console.log(`\n📁 Output: ${MARKDOWN_EXTRACTED}`);
