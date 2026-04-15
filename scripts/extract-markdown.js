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
const IS_CI = process.env.GITHUB_ACTIONS === 'true';
const CONTENT_ROOT = path.join(__dirname, '..', 'content');

// Dynamic Output: Locally use 'handouts/', in CI use 'markdown/extracted/' for web sync
const MARKDOWN_EXTRACTED = IS_CI 
  ? path.join(__dirname, '..', 'markdown', 'extracted')
  : path.join(__dirname, '..', 'handouts');

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
 * Extract KaTeX/LaTeX math from HTML using DOM manipulation
 */
function processMathInDoc(doc) {
  // Find all .katex elements with math annotations
  const mathElements = doc.querySelectorAll('.katex');
  mathElements.forEach(el => {
    const annotation = el.querySelector('annotation[encoding="application/x-tex"]');
    if (annotation) {
      const latex = annotation.textContent;
      const isDisplay = el.classList.contains('display') || 
                        el.parentElement?.classList.contains('math-display') ||
                        el.closest('.math-display') !== null;
      
      const tex = isDisplay ? `\n\n$$${latex}$$\n\n` : `$${latex}$`;
      
      // Replace the element with a text node
      const texNode = doc.createTextNode(tex);
      el.parentNode.replaceChild(texNode, el);
    }
  });
}

/**
 * Extract images from ZIP and return updated content paths
 * Stream to disk immediately to minimize memory usage
 */
/**
 * Extract images from ZIP and return updated content paths
 * Stream to disk immediately to minimize memory usage
 * Adds a prefix to filenames to prevent collisions (e.g., Course_File_image.png)
 */
function extractImages(zipBuffer, outputDir, prefix = '') {
  const imageMap = {};
  let imageCount = 0;
  
  try {
    const zip = new AdmZip(zipBuffer);
    const entries = zip.getEntries();
    
    for (const entry of entries) {
      if (entry.isDirectory) continue;
      
      const fileName = entry.name.toLowerCase();
      if (!/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileName)) continue;
      
      try {
        // Extract to markdown/extracted/assets/ - stream immediately
        const basename = path.basename(entry.name);
        
        // ✨ NEW: Prefix filename with archive name to prevent collisions
        const safePrefix = prefix.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
        const uniqueName = safePrefix ? `${safePrefix}_${basename}` : basename;
        
        const outputPath = path.join(outputDir, uniqueName);
        const assetRelativePath = `assets/${uniqueName}`;
        
        // Write to disk immediately to free memory
        fs.writeFileSync(outputPath, entry.getData());
        
        // Store only essential mappings to reduce memory usage
        imageMap[basename] = assetRelativePath;
        imageMap[entry.name] = assetRelativePath;
        
        imageCount++;
      } catch (err) {
        // Skip individual image errors
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
 * Process a single .u.zip.html file with optimized memory management
 */
function processArchive(filePath, relativePath) {
  let dom = null;
  let fileData = null;
  
  try {
    // Read ZIP buffer from embedded file
    fileData = fs.readFileSync(filePath);
    
    // Determine output path
    const fileName = path.basename(filePath, '.u.zip.html');
    const dirName = path.dirname(relativePath);
    const outputDir = path.join(MARKDOWN_EXTRACTED, dirName);
    ensureDir(outputDir);
    
    // Extract images first and free buffer memory
    const imageMap = extractImages(fileData, ASSETS_DIR, fileName);
    
    try {
      // Extract HTML content - this creates the largest memory footprint
      const doc = dom.window.document;
      
      // Process math in-place in the DOM
      processMathInDoc(doc);
      
      const htmlContent = doc.body.innerHTML;
      
      // Close and clear DOM to free memory immediately
      try {
        dom.window.close?.();
      } catch (e) {
        // Ignore cleanup errors
      }
      dom = null;
      
      // Convert to markdown
      const markdown = htmlToMarkdown(htmlContent, imageMap);
      
      // Create output markdown file
      const outputPath = path.join(outputDir, `${fileName}.md`);
      const frontmatter = `---\ntitle: ${fileName.replace(/_/g, ' ')}\ndate: ${new Date().toISOString()}\n---\n\n`;
      
      fs.writeFileSync(outputPath, frontmatter + markdown);
      
      console.log(`✅ ${relativePath} → ${path.relative(MARKDOWN_EXTRACTED, outputPath)}`);
      processedCount++;
      
    } catch (parseErr) {
      console.warn(`⚠️  Could not parse HTML for ${relativePath}: ${parseErr.message}`);
      console.log(`  → Switching to fallback HTML processing`);
      
      try {
        // Fallback: use raw HTML without JSDOM parsing to reduce memory
        const rawHtml = fileData.toString('utf-8');
        const markdown = htmlToMarkdown(rawHtml, {});
        
        const outputPath = path.join(outputDir, `${fileName}.md`);
        const frontmatter = `---\ntitle: ${fileName.replace(/_/g, ' ')}\ndate: ${new Date().toISOString()}\n---\n\n`;
        
        fs.writeFileSync(outputPath, frontmatter + markdown);
        console.log(`✅ ${relativePath} (fallback) → ${path.relative(MARKDOWN_EXTRACTED, outputPath)}`);
        processedCount++;
      } catch (fallbackErr) {
        console.error(`❌ Error processing ${relativePath}: ${fallbackErr.message}`);
        errorCount++;
      }
    } finally {
      // Ensure DOM is always cleaned up
      if (dom) {
        try {
          dom.window.close?.();
        } catch (e) {
          // Ignore cleanup errors
        }
        dom = null;
      }
    }
    
  } catch (err) {
    console.error(`❌ Failed to read ${relativePath}: ${err.message}`);
    errorCount++;
  } finally {
    // Clear references for garbage collection
    fileData = null;
    
    // Trigger garbage collection after each file
    if (global.gc) {
      global.gc();
    }
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
