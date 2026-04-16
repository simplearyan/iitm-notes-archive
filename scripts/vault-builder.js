#!/usr/bin/env node

/**
 * 🛠️ Reading Vault Builder (Project Simplified)
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Extracts course materials to Markdown.
 * 2. Scans manually written notes.
 * 3. Builds a master navigation tree.
 * 4. INJECTS the tree directly into 'markdown/index.html'.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');

// ============ CONFIGURATION ============
const CWD = process.cwd();
const INPUT_DIR = path.resolve(CWD, 'content');
const VAULT_ROOT = path.resolve(CWD, 'markdown');
const EXTRACTED_DIR = path.resolve(VAULT_ROOT, 'extracted');
const MANUAL_DIR = path.resolve(VAULT_ROOT, 'manual');
const UI_PATH = path.resolve(VAULT_ROOT, 'index.html');

const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
});

// ============ UTILITIES ============

function cleanName(name) {
    return name
        .replace(/_+/g, ' ')
        .replace(/\s*\(\d{1,2}_\d{1,2}_\d{4}.*?\)/, '') // remove timestamps
        .replace(/\.u\.zip$/, '')
        .replace(/\.md$/, '')
        .trim();
}

/**
 * 🕵️ Recursively find files
 */
function walk(dir, extension) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of list) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(walk(fullPath, extension));
        } else if (entry.name.toLowerCase().endsWith(extension)) {
            results.push(fullPath);
        }
    }
    return results;
}

// ============ EXTRACTION ============

function extractModule(sourcePath) {
    try {
        const html = fs.readFileSync(sourcePath, 'utf-8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const mainContent = doc.querySelector('.content-wrapper') || doc.body;
        if (!mainContent) return null;

        // Clean UI noise
        mainContent.querySelectorAll('.no-print, nav, footer, script').forEach(el => el.remove());

        const markdown = turndownService.turndown(mainContent.innerHTML);
        const title = doc.title.replace(/_ IITM Online Degree.*$/, '').trim();

        // Build path mirroring structure
        const relPath = path.relative(INPUT_DIR, sourcePath).replace(/\.u\.zip\.html$/i, '.md');
        const destPath = path.join(EXTRACTED_DIR, relPath);

        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        
        const fileContent = `---\ntitle: "${title}"\nsource: "extracted"\n---\n\n# ${title}\n\n${markdown}`;
        fs.writeFileSync(destPath, fileContent);

        return {
            type: 'file',
            name: title,
            path: relPath.replace(/\.md$/, ''),
            source: 'extracted'
        };
    } catch (err) {
        console.error(`❌ Skip ${path.basename(sourcePath)}: ${err.message}`);
        return null;
    }
}

// ============ BUILD & INJECT ============

function buildNavTree(dir, source, relativeRoot = '') {
    if (!fs.existsSync(dir)) return [];
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const nodes = [];

    for (const entry of entries) {
        if (entry.name.startsWith('.') || ['assets', 'node_modules'].includes(entry.name)) continue;
        
        const fullPath = path.join(dir, entry.name);
        const relPath = relativeRoot ? `${relativeRoot}/${entry.name}` : entry.name;

        if (entry.isDirectory()) {
            const children = buildNavTree(fullPath, source, relPath);
            if (children.length > 0) {
                nodes.push({
                    type: 'folder',
                    name: cleanName(entry.name),
                    path: relPath,
                    children
                });
            }
        } else if (entry.name.endsWith('.md')) {
            // Read title from file if possible, otherwise clean name
            const content = fs.readFileSync(fullPath, 'utf-8');
            const titleMatch = content.match(/^title:\s*"(.*)"/m) || content.match(/^#+\s*(.*)/m);
            const title = titleMatch ? titleMatch[1].trim() : cleanName(entry.name);
            
            nodes.push({
                type: 'file',
                name: title,
                path: relPath.replace(/\.md$/, ''),
                source: source
            });
        }
    }

    return nodes.sort((a, b) => {
        if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
        return a.name.localeCompare(b.name);
    });
}

function runBuild() {
    console.log('🚀 Building Reading Vault...');

    // 1. Extractions
    const zips = walk(INPUT_DIR, '.u.zip.html');
    console.log(`📦 Found ${zips.length} modules to extract.`);
    zips.forEach(zip => extractModule(zip));

    // 2. Scan both hierarchies
    const extractedNav = buildNavTree(EXTRACTED_DIR, 'extracted');
    const manualNav = buildNavTree(MANUAL_DIR, 'manual');
    const fullNav = [...extractedNav, ...manualNav];

    // 3. Stats & Breadcrumbs
    const stats = {
        totalFiles: walk(EXTRACTED_DIR, '.md').length + walk(MANUAL_DIR, '.md').length,
        extractedFiles: walk(EXTRACTED_DIR, '.md').length,
        manualFiles: walk(MANUAL_DIR, '.md').length
    };

    const breadcrumbs = {};
    const mapper = (nodes, trail = []) => {
        nodes.forEach(n => {
            const currentTrail = [...trail, n.name];
            breadcrumbs[n.path] = currentTrail;
            if (n.children) mapper(n.children, currentTrail);
        });
    };
    mapper(fullNav);

    // 4. Inject
    const jsonData = JSON.stringify({ stats, navigation: fullNav, breadcrumbs }, null, 2);
    let html = fs.readFileSync(UI_PATH, 'utf-8');
    
    const regex = /(<!-- SIDEBAR-DATA-START -->)[\s\S]*?(<!-- SIDEBAR-DATA-END -->)/;
    const replacement = `$1\n    <script id="vault-data" type="application/json">\n    ${jsonData}\n    </script>\n    $2`;
    
    const newHtml = html.replace(regex, replacement);
    fs.writeFileSync(UI_PATH, newHtml);

    console.log('✅ Vault built and sidebar injected successfully!');
    console.log(`📊 Stats: ${stats.totalFiles} documents, ${stats.extractedFiles} extracted.`);
}

try {
    runBuild();
} catch (err) {
    console.error('💥 Build Failed:', err);
    process.exit(1);
}
