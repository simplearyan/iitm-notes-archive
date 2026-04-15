#!/usr/bin/env node

/**
 * Markdown Index Injector
 * Injects the generated index.json into markdown/index.html
 */

const fs = require('fs');
const path = require('path');

const INDEX_JSON_PATH = path.join(__dirname, '..', 'markdown', 'index.json');
const HTML_PATH = path.join(__dirname, '..', 'markdown', 'index.html');

console.log('📝 Injecting markdown index into HTML...');

// Read the generated index
const indexJson = fs.readFileSync(INDEX_JSON_PATH, 'utf-8');
const indexData = JSON.parse(indexJson);

// Read the HTML file
let htmlContent = fs.readFileSync(HTML_PATH, 'utf-8');

// Replace the placeholder in the site-index script tag
const regex = /(<script id="site-index" type="application\/json">)\s*\{[\s\S]*?\}[\s\S]*?(<\/script>)/;
const newContent = htmlContent.replace(
  regex,
  `$1\n    ${JSON.stringify(indexData, null, 4)}\n    $2`
);

// Write back to HTML
fs.writeFileSync(HTML_PATH, newContent, 'utf-8');

console.log('✅ Markdown index injected successfully!');
console.log(`📊 Index contains ${indexData.stats.totalFiles} files (${indexData.stats.extractedFiles} extracted, ${indexData.stats.manualFiles} manual)`);
