#!/usr/bin/env node

/**
 * 🏛️ IITM Vault Builder (Image-Safe Edition)
 * ─────────────────────────────────────────────────────────────────────────────
 * Fix: Extracts images from archives/folders and centralizes them in 'markdown/assets'
 * to avoid all path-resolution issues on GitHub Pages.
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
const ASSETS_DIR = path.resolve(VAULT_DIR, 'assets');
const INDEX_HTML = path.resolve(VAULT_DIR, 'index.html');

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

/**
 * 🛠️ Phase 1: Heavy-Duty Archive Discovery
 */
function findSources(dir) {
    let sources = [];
    if (!fs.existsSync(dir)) return sources;
    const list = fs.readdirSync(dir, { withFileTypes: true });

    if (fs.existsSync(path.join(dir, 'index.html')) && dir !== CONTENT_DIR) {
        sources.push({ type: 'unzipped', htmlPath: path.join(dir, 'index.html'), baseDir: dir });
        return sources;
    }

    for (const item of list) {
        const full = path.join(dir, item.name);
        if (item.isDirectory()) sources = sources.concat(findSources(full));
        else if (item.name.toLowerCase().endsWith('.u.zip.html')) {
            sources.push({ type: 'archive', htmlPath: full, baseDir: dir });
        }
    }
    return sources;
}

/**
 * 🚀 Build Runner
 */
async function build() {
    console.log('🏛️ --- VAULT MASTER BUILD (ASSET-SAFE) ---');
    
    // Cleanup
    if (fs.existsSync(EXTRACTED_DIR)) fs.rmSync(EXTRACTED_DIR, { recursive: true, force: true });
    // Note: We keep the assets folder to avoid massive churn, but we'll overwrite as needed
    if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });
    fs.mkdirSync(EXTRACTED_DIR, { recursive: true });

    const sources = findSources(CONTENT_DIR);
    console.log(`📦 Found ${sources.length} content sources.`);

    sources.forEach(source => {
        try {
            const html = fs.readFileSync(source.htmlPath, 'utf-8');
            const dom = new JSDOM(html);
            const doc = dom.window.document;
            const main = doc.querySelector('.content-wrapper') || doc.body;
            
            main.querySelectorAll('.no-print, nav, footer, script').forEach(el => el.remove());

            // 📸 Handle Images (Centralization)
            const courseId = path.relative(CONTENT_DIR, source.baseDir).replace(/[\\/]/g, '_').replace(/\.u\.zip\.html$/i, '');
            
            main.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src');
                if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                    // Find actual image on disk
                    const imgSourcePath = path.resolve(source.baseDir, src);
                    if (fs.existsSync(imgSourcePath)) {
                        const imgExt = path.extname(src) || '.png';
                        const safeFileName = `${courseId}_${path.basename(src, imgExt)}`.replace(/[^a-zA-Z0-9_-]/g, '') + imgExt;
                        const imgDestPath = path.join(ASSETS_DIR, safeFileName);
                        
                        // Copy to central assets
                        fs.copyFileSync(imgSourcePath, imgDestPath);
                        
                        // Update link to be relative to the markdown/ index.html
                        img.setAttribute('src', `assets/${safeFileName}`);
                    }
                }
            });

            const md = turndown.turndown(main.innerHTML);
            const title = doc.title.replace(/_ IITM Online Degree.*$/, '').trim();

            const relPath = path.relative(CONTENT_DIR, source.baseDir) + '.md';
            const dest = path.join(EXTRACTED_DIR, relPath);
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.writeFileSync(dest, `---\ntitle: "${title}"\n---\n\n# ${title}\n\n${md}`);
        } catch (e) {
            console.error(`❌ Export failed: ${source.htmlPath} - ${e.message}`);
        }
    });

    // Generate Nav Tree
    function buildNodeTree(dir, source, relativePath = '') {
        if (!fs.existsSync(dir)) return [];
        const items = fs.readdirSync(dir, { withFileTypes: true });
        const nodes = [];
        for (const item of items) {
            if (item.name.startsWith('.') || item.name === 'assets') continue;
            const full = path.join(dir, item.name);
            const rel = relativePath ? `${relativePath}/${item.name}` : item.name;
            if (item.isDirectory()) {
                const kids = buildNodeTree(full, source, rel);
                if (kids.length > 0) nodes.push({
                    type: 'folder',
                    name: item.name.replace(/_+/g, ' ').replace(/\s*\(\d{1,2}_\d{1,2}_\d{4}.*?\)/, '').trim(),
                    path: rel,
                    children: kids.sort((a,b) => (a.type === b.type ? a.name.localeCompare(b.name) : (a.type === 'folder' ? -1 : 1)))
                });
            } else if (item.name.endsWith('.md')) {
                const content = fs.readFileSync(full, 'utf-8');
                const titleMatch = content.match(/^title:\s*"(.*)"/m) || content.match(/^#+\s*(.*)/m);
                nodes.push({ type: 'file', name: titleMatch ? titleMatch[1].trim() : item.name, path: rel.replace('.md', ''), source });
            }
        }
        return nodes.sort((a,b) => (a.type === b.type ? a.name.localeCompare(b.name) : (a.type === 'folder' ? -1 : 1)));
    }

    const navigation = [...buildNodeTree(EXTRACTED_DIR, 'extracted'), ...buildNodeTree(MANUAL_DIR, 'manual')];
    const breadcrumbs = {};
    const mapper = (nodes, trail = []) => {
        nodes.forEach(n => {
            const currentTrail = [...trail, n.name];
            breadcrumbs[n.path] = currentTrail;
            if (n.children) mapper(n.children, currentTrail);
        });
    };
    mapper(navigation);

    const stats = {
        buildId: `VAULT-${new Date().getTime()}`,
        totalFiles: (function count(nodes) { return nodes.reduce((acc, n) => acc + (n.type === 'file' ? 1 : count(n.children || [])), 0); })(navigation),
        timestamp: new Date().toISOString()
    };

    const payload = JSON.stringify({ stats, navigation, breadcrumbs }, null, 2);
    let html = fs.readFileSync(INDEX_HTML, 'utf-8');
    const regex = /(<!-- SIDEBAR-DATA-START -->)[\s\S]*?(<!-- SIDEBAR-DATA-END -->)/;
    fs.writeFileSync(INDEX_HTML, html.replace(regex, `$1\n    <script id="vault-data" type="application/json">\n    ${payload}\n    </script>\n    $2`));

    console.log(`✅ Build Complete! Injected ${stats.totalFiles} documents.`);
}

build();
