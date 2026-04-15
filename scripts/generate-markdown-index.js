#!/usr/bin/env node

/**
 * Markdown Index Generator
 * 
 * Processes markdown files from markdown/extracted/ and markdown/manual/
 * Generates:
 * 1. Nested sidebar tree (folders and files)
 * 2. Full-text search index (Lunr.js format)
 * 3. Breadcrumb mappings
 */

const fs = require('fs');
const path = require('path');

// ============ Configuration ============
const MARKDOWN_ROOT = path.join(__dirname, '..', 'markdown');
const EXTRACTED_DIR = path.join(MARKDOWN_ROOT, 'extracted');
const MANUAL_DIR = path.join(MARKDOWN_ROOT, 'manual');
const OUTPUT_PATH = path.join(MARKDOWN_ROOT, 'index.json');

// Folders to skip during traversal
const SKIP_FOLDERS = ['.git', '.github', 'node_modules', 'assets'];

// ============ File Reading Utilities ============

/**
 * Extract frontmatter from markdown file
 * Looks for YAML between --- lines at the start
 */
function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  
  const yaml = match[1];
  const frontmatter = {};
  
  yaml.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      // Remove quotes if present
      frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '');
    }
  });
  
  return frontmatter;
}

/**
 * Extract title and first 200 chars of content
 */
function extractContentPreview(content) {
  // Remove frontmatter
  const bodyMatch = content.replace(/^---\n[\s\S]*?\n---\n/, '');
  
  // Extract first heading as title
  const titleMatch = bodyMatch.match(/^#+\s+(.+?)$/m);
  const title = titleMatch ? titleMatch[1] : null;
  
  // Get first paragraph for snippet
  const snippetMatch = bodyMatch.match(/^[^#]+/);
  const snippet = snippetMatch ? snippetMatch[0].trim().substring(0, 200) : '';
  
  return { title, snippet };
}

/**
 * Recursively scan directory and build tree + search index
 */
function scanDirectory(dirPath, relativePath = '', source = 'extracted') {
  const items = [];
  const searchDocs = [];
  
  if (!fs.existsSync(dirPath)) {
    return { items, searchDocs };
  }
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Skip hidden/system folders
      if (SKIP_FOLDERS.includes(entry.name) || entry.name.startsWith('.')) {
        continue;
      }
      
      const entryPath = path.join(dirPath, entry.name);
      const entryRelative = relativePath ? `${relativePath}/${entry.name}` : entry.name;
      
      // Recursively scan subdirectory
      const { items: subItems, searchDocs: subDocs } = scanDirectory(entryPath, entryRelative, source);
      
      if (subItems.length > 0) {
        items.push({
          type: 'folder',
          name: cleanFolderName(entry.name),
          path: entryRelative,
          children: subItems,
        });
        searchDocs.push(...subDocs);
      }
    } else if (entry.name.endsWith('.md')) {
      const entryPath = path.join(dirPath, entry.name);
      const entryRelative = relativePath ? `${relativePath}/${entry.name}` : entry.name;
      
      // Read markdown file
      const content = fs.readFileSync(entryPath, 'utf-8');
      const frontmatter = extractFrontmatter(content);
      const { title, snippet } = extractContentPreview(content);
      
      // Get file name without .md extension
      const fileTitle = frontmatter.title || title || entry.name.replace(/\.md$/, '');
      
      items.push({
        type: 'file',
        name: fileTitle,
        path: entryRelative,
        source: source,
      });
      
      // Add to search index
      searchDocs.push({
        id: entryRelative,
        title: fileTitle,
        path: entryRelative,
        source: source,
        content: content.replace(/^---[\s\S]*?---/, ''), // content without frontmatter
        snippet: snippet,
        tags: frontmatter.tags ? frontmatter.tags.split(',').map(t => t.trim()) : [],
      });
    }
  }
  
  // Sort items: folders first, then files (both alphabetically)
  items.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'folder' ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
  
  return { items, searchDocs };
}

/**
 * Clean up folder names (remove timestamps and special chars)
 */
function cleanFolderName(name) {
  return name
    .replace(/_+/g, ' ')
    .replace(/\s*\(\d{1,2}_\d{1,2}_\d{4}.*?\)/, '') // remove timestamps
    .replace(/\.u\.zip$/, '') // remove archive extension
    .trim();
}

/**
 * Build a flat breadcrumb map for faster lookups
 */
function buildBreadcrumbMap(items, breadtrail = []) {
  const map = {};
  
  for (const item of items) {
    const current = [...breadtrail, item.name];
    map[item.path] = current;
    
    if (item.type === 'folder' && item.children) {
      Object.assign(map, buildBreadcrumbMap(item.children, current));
    }
  }
  
  return map;
}

/**
 * Build Lunr.js compatible search index
 */
function buildSearchIndex(searchDocs) {
  return {
    version: '2', // Lunr.js version
    fields: [
      { fieldName: 'title', boost: 10 },
      { fieldName: 'content', boost: 1 },
      { fieldName: 'tags', boost: 5 },
    ],
    fieldVectors: {}, // Will be populated by Lunr on client side
    invertedIndex: {}, // Will be populated by Lunr on client side
    documents: searchDocs, // Store full documents for result display
    pipelineFunctions: ['stemmer'],
  };
}

// ============ Main Execution ============

console.log('🔍 Generating markdown index...');

const { items: extractedItems, searchDocs: extractedDocs } = scanDirectory(EXTRACTED_DIR, '', 'extracted');
const { items: manualItems, searchDocs: manualDocs } = scanDirectory(MANUAL_DIR, '', 'manual');

// Merge both sources
const allItems = [];
if (extractedItems.length > 0) {
  allItems.push({
    type: 'folder',
    name: 'Course Materials',
    path: 'extracted',
    children: extractedItems,
  });
}
if (manualItems.length > 0) {
  allItems.push({
    type: 'folder',
    name: 'Study Notes',
    path: 'manual',
    children: manualItems,
  });
}

const breadcrumbs = buildBreadcrumbMap(allItems);
const searchIndex = buildSearchIndex([...extractedDocs, ...manualDocs]);

// Build final output
const output = {
  version: '1.0',
  timestamp: new Date().toISOString(),
  stats: {
    totalFiles: [...extractedDocs, ...manualDocs].length,
    extractedFiles: extractedDocs.length,
    manualFiles: manualDocs.length,
  },
  navigation: allItems,
  search: searchIndex,
  breadcrumbs: breadcrumbs,
};

// Write to file
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

console.log(`✅ Index generated: ${OUTPUT_PATH}`);
console.log(`📊 Total files: ${output.stats.totalFiles}`);
console.log(`  - Course Materials: ${output.stats.extractedFiles}`);
console.log(`  - Study Notes: ${output.stats.manualFiles}`);
