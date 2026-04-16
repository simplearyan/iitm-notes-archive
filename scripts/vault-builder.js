#!/usr/bin/env node

/**
 * 🏛️ IITM Vault Builder (Asset-Sync Edition)
 * ─────────────────────────────────────────────────────────────────────────────
 * Fix: Centralizes all images in 'markdown/extracted/assets' and performs
 * automatic cleanup to eliminate legacy "Ghost Images".
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
const CONFIG_PATH = path.resolve(ROOT_DIR, 'vault-config.json');
const EXTRACTED_DIR = path.resolve(VAULT_DIR, 'extracted');
const MANUAL_DIR = path.resolve(VAULT_DIR, 'manual');
const ASSETS_DIR = path.resolve(EXTRACTED_DIR, 'assets');
const INDEX_HTML = path.resolve(VAULT_DIR, 'index.html');

// 2. Load Config
let CONFIG = { excludePatterns: [], hideExtensions: true };
if (fs.existsSync(CONFIG_PATH)) {
    try { CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8')); }
    catch (e) { console.warn("⚠️ Failed to load vault-config.json, using defaults."); }
}

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

/**
 * 🕵️ Phase 1: Heavy-Duty Discovery
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
    console.log('🏛️ --- READING VAULT ASSET SYNC ---');
    
    // Cleanup Logic
    const shouldClean = process.env.CLEAN_ASSETS === 'true';
    if (shouldClean) {
        console.log('🧹 Cleanup Triggered: Clearing extracted folder and assets...');
        if (fs.existsSync(EXTRACTED_DIR)) fs.rmSync(EXTRACTED_DIR, { recursive: true, force: true });
    }
    
    if (!fs.existsSync(EXTRACTED_DIR)) fs.mkdirSync(EXTRACTED_DIR, { recursive: true });
    if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });

    const sources = findSources(CONTENT_DIR);
    console.log(`📦 Found ${sources.length} content sources.`);

    let imageCount = 0;

    sources.forEach(source => {
        try {
            const html = fs.readFileSync(source.htmlPath, 'utf-8');
            const dom = new JSDOM(html);
            const doc = dom.window.document;
            const main = doc.querySelector('.content-wrapper') || doc.body;
            
            main.querySelectorAll('.no-print, nav, footer, script').forEach(el => el.remove());

            // 🎓 Handle KaTeX (HTML to Markdown-Safe LaTeX)
            main.querySelectorAll('.katex').forEach(k => {
                const annotation = k.querySelector('annotation[encoding="application/x-tex"]');
                if (annotation) {
                    const tex = annotation.textContent.trim();
                    const isDisplay = k.closest('.katex-display') !== null;
                    const replacement = isDisplay ? `\n$$\n${tex}\n$$\n` : `$${tex}$`;
                    const span = doc.createElement('span');
                    span.textContent = replacement;
                    k.parentNode.replaceChild(span, k);
                }
            });

            // 📸 Centralize Images
            const courseId = path.relative(CONTENT_DIR, source.baseDir).replace(/[\\/]/g, '_');
            
            main.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src');
                if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                    const imgSourcePath = path.resolve(source.baseDir, src);
                    if (fs.existsSync(imgSourcePath)) {
                        const imgExt = path.extname(src) || '.png';
                        const safeFileName = `${courseId}_${path.basename(src, imgExt)}`.replace(/[^a-zA-Z0-9_-]/g, '') + imgExt;
                        const imgDestPath = path.join(ASSETS_DIR, safeFileName);
                        
                        fs.copyFileSync(imgSourcePath, imgDestPath);
                        imageCount++;
                        
                        // Path relative to markdown/index.html is 'extracted/assets/...'
                        img.setAttribute('src', `extracted/assets/${safeFileName}`);
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

    console.log(`📷 Sync complete! Processed ${imageCount} unique images.`);

    // Navigation Tree Logic
    function buildNodeTree(dir, source, relativePathSuffix = '') {
        if (!fs.existsSync(dir)) return [];
        const items = fs.readdirSync(dir, { withFileTypes: true });
        const nodes = [];
        for (const item of items) {
            if (item.name.startsWith('.') || item.name === 'assets') continue;
            
            // 🛡️ Smart Exclusion Logic
            const isExcluded = CONFIG.excludePatterns.some(pattern => new RegExp(pattern).test(item.name));
            if (isExcluded) continue;

            const full = path.join(dir, item.name);
            const rel = relativePathSuffix ? `${relativePathSuffix}/${item.name}` : item.name;
            if (item.isDirectory()) {
                const kids = buildNodeTree(full, source, rel);
                if (kids.length > 0) {
                    let folderName = item.name.replace(/_+/g, ' ').replace(/\s*\(\d{1,2}_\d{1,2}_\d{4}.*?\)/, '').trim();
                    nodes.push({
                        type: 'folder',
                        name: folderName,
                        path: rel,
                        children: kids.sort((a,b) => (a.type === b.type ? a.name.localeCompare(b.name) : (a.type === 'folder' ? -1 : 1)))
                    });
                }
            } else if (item.name.endsWith('.md')) {
                const content = fs.readFileSync(full, 'utf-8');
                const titleMatch = content.match(/^title:\s*"(.*)"/m) || content.match(/^#+\s*(.*)/m);
                let fileName = titleMatch ? titleMatch[1].trim() : item.name;
                
                // Pretty Titles: Remove extension
                if (CONFIG.hideExtensions) {
                    fileName = fileName.replace(/\.md$/, '');
                }

                nodes.push({ type: 'file', name: fileName, path: rel.replace('.md', ''), source });
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

    console.log(`✅ Build Complete! Injected ${stats.totalFiles} documents into Vault.`);
}

build();
