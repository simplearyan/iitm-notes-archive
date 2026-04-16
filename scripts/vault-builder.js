#!/usr/bin/env node

/**
 * 🏛️ IITM Vault Builder (Universal Edition)
 * ─────────────────────────────────────────────────────────────────────────────
 * Fix: Looks for BOTH archives (.u.zip.html) and unzipped folders (index.html),
 * making it compatible with the 'optimize-for-prod.js' script.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');

// 1. Setup paths
const SCRIPTS_DIR = __dirname;
const ROOT_DIR = path.resolve(SCRIPTS_DIR, '..');
const CONTENT_DIR = path.resolve(ROOT_DIR, 'content');
const VAULT_DIR = path.resolve(ROOT_DIR, 'markdown');
const EXTRACTED_DIR = path.resolve(VAULT_DIR, 'extracted');
const MANUAL_DIR = path.resolve(VAULT_DIR, 'manual');
const INDEX_HTML = path.resolve(VAULT_DIR, 'index.html');

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

/**
 * 🛠️ Step 1: Smart Content Discovery
 * Finds both raw archives and folders that were already unzipped.
 */
function runExtraction() {
    console.log('--- Phase 1: Smart Discovery & Extraction ---');
    if (fs.existsSync(EXTRACTED_DIR)) fs.rmSync(EXTRACTED_DIR, { recursive: true, force: true });
    fs.mkdirSync(EXTRACTED_DIR, { recursive: true });

    function findSources(dir) {
        let sources = [];
        if (!fs.existsSync(dir)) return sources;
        const list = fs.readdirSync(dir, { withFileTypes: true });

        // Is this a folder that was JUST unzipped by optimize-for-prod?
        if (fs.existsSync(path.join(dir, 'index.html'))) {
            // Only count it if it's NOT the root or a top-level category
            if (dir !== CONTENT_DIR) {
                sources.push({ type: 'folder', path: path.join(dir, 'index.html'), id: dir });
                return sources; // Stop recursion here, we found the leaf
            }
        }

        for (const item of list) {
            const full = path.join(dir, item.name);
            if (item.isDirectory()) {
                sources = sources.concat(findSources(full));
            } else if (item.name.toLowerCase().endsWith('.u.zip.html')) {
                sources.push({ type: 'archive', path: full, id: full });
            }
        }
        return sources;
    }

    const sources = findSources(CONTENT_DIR);
    console.log(`📦 Found ${sources.length} content sources in 'content/'.`);

    sources.forEach(source => {
        try {
            const html = fs.readFileSync(source.path, 'utf-8');
            const dom = new JSDOM(html);
            const doc = dom.window.document;
            const main = doc.querySelector('.content-wrapper') || doc.body;
            
            // 📸 Rewrite image paths relative to the content directory
            const baseRel = path.relative(CONTENT_DIR, source.id).replace(/\.u\.zip\.html$/i, '').replace(/\.html$/i, '');
            main.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src');
                if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                    // Make it relative to the vault root: ../content/course-name/lesson-name/image.png
                    const newSrc = `../content/${baseRel}/${src}`;
                    img.setAttribute('src', newSrc);
                }
            });

            const md = turndown.turndown(main.innerHTML);
            const title = doc.title.replace(/_ IITM Online Degree.*$/, '').trim();

            const relPath = path.relative(CONTENT_DIR, source.id)
                .replace(/\.u\.zip\.html$/i, '')
                .replace(/\.html$/i, '') + '.md';
            
            const dest = path.join(EXTRACTED_DIR, relPath);
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.writeFileSync(dest, `---\ntitle: "${title}"\n---\n\n# ${title}\n\n${md}`);
            // console.log(`✅ Extracted: ${title}`);
        } catch (e) {
            console.error(`❌ Export failed: ${source.path} - ${e.message}`);
        }
    });
}

/**
 * 🌲 Step 2: Recursive Sidebar Generation
 */
function buildNav(dir, source, relativePath = '') {
    if (!fs.existsSync(dir)) return [];
    
    const items = fs.readdirSync(dir, { withFileTypes: true });
    const nodes = [];

    for (const item of items) {
        if (item.name.startsWith('.') || item.name === 'assets') continue;
        
        const fullPath = path.join(dir, item.name);
        const relPath = relativePath ? `${relativePath}/${item.name}` : item.name;

        if (item.isDirectory()) {
            const children = buildNav(fullPath, source, relPath);
            if (children.length > 0) {
                nodes.push({
                    type: 'folder',
                    name: item.name.replace(/_+/g, ' ').replace(/\s*\(\d{1,2}_\d{1,2}_\d{4}.*?\)/, '').trim(),
                    path: relPath,
                    children: children.sort((a,b) => (a.type === b.type ? a.name.localeCompare(b.name) : (a.type === 'folder' ? -1 : 1)))
                });
            }
        } else if (item.name.endsWith('.md')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const titleMatch = content.match(/^title:\s*"(.*)"/m) || content.match(/^#+\s*(.*)/m);
            const title = titleMatch ? titleMatch[1].trim() : item.name.replace('.md', '');

            nodes.push({
                type: 'file',
                name: title,
                path: relPath.replace('.md', ''),
                source: source
            });
        }
    }
    return nodes.sort((a,b) => (a.type === b.type ? a.name.localeCompare(b.name) : (a.type === 'folder' ? -1 : 1)));
}

async function build() {
    runExtraction();

    const extractedTree = buildNav(EXTRACTED_DIR, 'extracted') || [];
    const manualTree = buildNav(MANUAL_DIR, 'manual') || [];
    const fullNavigation = [...extractedTree, ...manualTree];

    const breadcrumbs = {};
    const map = (nodes, trail = []) => {
        nodes.forEach(n => {
            const currentTrail = [...trail, n.name];
            breadcrumbs[n.path] = currentTrail;
            if (n.children) map(n.children, currentTrail);
        });
    };
    map(fullNavigation);

    const stats = {
        buildId: `VAULT-${new Date().getTime()}`,
        totalFiles: (function count(nodes) {
            return nodes.reduce((acc, n) => acc + (n.type === 'file' ? 1 : count(n.children || [])), 0);
        })(fullNavigation),
        timestamp: new Date().toISOString()
    };

    const payload = JSON.stringify({ stats, navigation: fullNavigation, breadcrumbs }, null, 2);
    
    let html = fs.readFileSync(INDEX_HTML, 'utf-8');
    const regex = /(<!-- SIDEBAR-DATA-START -->)[\s\S]*?(<!-- SIDEBAR-DATA-END -->)/;
    const replacement = `$1\n    <script id="vault-data" type="application/json">\n    ${payload}\n    </script>\n    $2`;
    
    fs.writeFileSync(INDEX_HTML, html.replace(regex, replacement));

    console.log(`✅ Build Complete! Injected ${stats.totalFiles} documents.`);
    console.log(`📊 Build ID: ${stats.buildId}`);
}

build();
