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
const CWD = process.cwd();
const MARKDOWN_ROOT = path.resolve(CWD, 'markdown');
const EXTRACTED_DIR = path.resolve(MARKDOWN_ROOT, 'extracted');
const MANUAL_DIR = path.resolve(MARKDOWN_ROOT, 'manual');
const OUTPUT_PATH = path.resolve(MARKDOWN_ROOT, 'index.json');

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
      const pathWithoutExt = entryRelative.replace(/\.md$/, ''); // Remove .md from path
      
      console.log(`✅  [${source}] Found: ${entryRelative}`);
      
      items.push({
        type: 'file',
        name: fileTitle,
        path: pathWithoutExt,
        source: source,
      });
      
      // Add to search index
      searchDocs.push({
        id: pathWithoutExt,
        title: fileTitle,
        path: pathWithoutExt,
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

console.log('🔍 Generating consolidated navigation index...');

// 1. Load Pre-indexed data from the Extractor (Unified Step 1)
let consolidatedDocs = [];
const TEMP_INDEX_PATH = path.resolve(MARKDOWN_ROOT, 'extracted-index.tmp.json');

if (fs.existsSync(TEMP_INDEX_PATH)) {
  console.log('📦 Loading pre-indexed course materials...');
  const tempData = JSON.parse(fs.readFileSync(TEMP_INDEX_PATH, 'utf-8'));
  consolidatedDocs = tempData.extractedDocs || [];
} else {
  console.log('⚠️ No pre-indexed course materials found. Scanning directory manually as fallback...');
  const { searchDocs: fallbackDocs } = scanDirectory(EXTRACTED_DIR, '', 'extracted');
  consolidatedDocs = fallbackDocs;
}

// 2. Scan Manual Study Notes
console.log('📁 Scanning Manual Study Notes...');
const { items: manualItems, searchDocs: manualDocs } = scanDirectory(MANUAL_DIR, '', 'manual');

// 3. Reconstruct Navigation Tree from Consolidated Docs
// This ensures that the navigation matches the search index perfectly
function reconstructNav(docs) {
    const root = [];
    const folderMap = {};

    docs.forEach(doc => {
        const parts = doc.id.split('/');
        let currentLevel = root;
        let currentPath = '';

        for (let i = 0; i < parts.length - 1; i++) {
            const folderName = parts[i];
            currentPath = currentPath ? `${currentPath}/${folderName}` : folderName;

            if (!folderMap[currentPath]) {
                const newFolder = {
                    type: 'folder',
                    name: folderName,
                    path: currentPath,
                    children: []
                };
                folderMap[currentPath] = newFolder;
                currentLevel.push(newFolder);
            }
            currentLevel = folderMap[currentPath].children;
        }

        currentLevel.push({
            type: 'file',
            name: doc.title,
            path: doc.path,
            source: doc.source
        });
    });

    return root;
}

const allItems = reconstructNav([...consolidatedDocs, ...manualDocs]);
const searchDocsFlat = [...consolidatedDocs, ...manualDocs];

const breadcrumbs = buildBreadcrumbMap(allItems);
const searchIndex = buildSearchIndex(searchDocsFlat);

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
