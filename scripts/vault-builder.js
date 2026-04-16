#!/usr/bin/env node

/**
 * 🏛️ IITM Vault Builder (Definitive Edition)
 * ─────────────────────────────────────────────────────────────────────────────
 * Simplifies the Reading Vault to match the home-page pattern.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');

// 1. Setup paths relative to the script location
const SCRIPTS_DIR = __dirname;
const ROOT_DIR = path.resolve(SCRIPTS_DIR, '..');
const CONTENT_DIR = path.resolve(ROOT_DIR, 'content');
const VAULT_DIR = path.resolve(ROOT_DIR, 'markdown');
const EXTRACTED_DIR = path.resolve(VAULT_DIR, 'extracted');
const MANUAL_DIR = path.resolve(VAULT_DIR, 'manual');
const INDEX_HTML = path.resolve(VAULT_DIR, 'index.html');

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

/**
 * 🛠️ Step 1: Atomic Extraction
 */
function runExtraction() {
    console.log('--- Phase 1: Extraction ---');
    if (fs.existsSync(EXTRACTED_DIR)) fs.rmSync(EXTRACTED_DIR, { recursive: true, force: true });
    fs.mkdirSync(EXTRACTED_DIR, { recursive: true });

    function findArchives(dir) {
        let files = [];
        if (!fs.existsSync(dir)) return files;
        const list = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of list) {
            const full = path.join(dir, item.name);
            if (item.isDirectory()) files = files.concat(findArchives(full));
            else if (item.name.toLowerCase().endsWith('.u.zip.html')) files.push(full);
        }
        return files;
    }

    const archives = findArchives(CONTENT_DIR);
    console.log(`📦 Found ${archives.length} archives in 'content/'.`);

    archives.forEach(archive => {
        try {
            const html = fs.readFileSync(archive, 'utf-8');
            const dom = new JSDOM(html);
            const doc = dom.window.document;
            const main = doc.querySelector('.content-wrapper') || doc.body;
            
            // Clean content
            main.querySelectorAll('.no-print, nav, footer, script').forEach(el => el.remove());
            const md = turndown.turndown(main.innerHTML);
            const title = doc.title.replace(/_ IITM Online Degree.*$/, '').trim();

            const relPath = path.relative(CONTENT_DIR, archive).replace(/\.u\.zip\.html$/i, '.md');
            const dest = path.join(EXTRACTED_DIR, relPath);
            
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.writeFileSync(dest, `---\ntitle: "${title}"\n---\n\n# ${title}\n\n${md}`);
        } catch (e) {
            console.error(`❌ Export failed: ${path.basename(archive)}`);
        }
    });
}

/**
 * 🌲 Step 2: Recursive Sidebar Generation (Simpler)
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

/**
 * 🚀 Build Runner
 */
async function build() {
    runExtraction();

    const extractedTree = buildNav(EXTRACTED_DIR, 'extracted');
    const manualTree = buildNav(MANUAL_DIR, 'manual');
    const fullNavigation = [...extractedTree, ...manualTree];

    // Compute simple breadcrumbs map
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
    
    // Inject into index.html
    let html = fs.readFileSync(INDEX_HTML, 'utf-8');
    const regex = /(<!-- SIDEBAR-DATA-START -->)[\s\S]*?(<!-- SIDEBAR-DATA-END -->)/;
    const replacement = `$1\n    <script id="vault-data" type="application/json">\n    ${payload}\n    </script>\n    $2`;
    
    fs.writeFileSync(INDEX_HTML, html.replace(regex, replacement));

    console.log(`✅ Build Complete! Injected ${stats.totalFiles} documents into Reading Vault.`);
    console.log(`📊 Build ID: ${stats.buildId}`);
}

build();
