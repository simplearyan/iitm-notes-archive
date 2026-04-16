#!/usr/bin/env node

/**
 * 🏛️ Handouts Indexer
 * ─────────────────────────────────────────────────────────────────────────────
 * Purpose: Scans the 'handouts/' directory and updates the Reading Vault UI.
 * Targets the 177+ extracted files.
 * Local only - not for commit.
 */

const fs = require('fs');
const path = require('path');

// 1. Setup paths
const SCRIPTS_DIR = __dirname;
const ROOT_DIR = path.resolve(SCRIPTS_DIR, '..');
const HANDOUTS_DIR = path.resolve(ROOT_DIR, 'handouts');
const VAULT_DIR = path.resolve(ROOT_DIR, 'extract-to-markdown');
const INDEX_HTML = path.resolve(VAULT_DIR, 'index.html');

console.log('🏛️ --- HANDOUTS VAULT INDEXER ---');

if (!fs.existsSync(HANDOUTS_DIR)) {
    console.error("❌ Error: 'handouts/' directory not found. Please run the extractor first.");
    process.exit(1);
}

/**
 * 🕵️ Navigation Tree Logic
 */
function buildNodeTree(dir, source, relativePathSuffix = '') {
    if (!fs.existsSync(dir)) return [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    const nodes = [];

    for (const item of items) {
        if (item.name.startsWith('.') || item.name === 'assets') continue;
        
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
            let fileName = titleMatch ? titleMatch[1].trim() : item.name.replace(/\.md$/, '');
            
            // Clean up titles (remove IITM signatures)
            fileName = fileName.replace(/_ IITM Online Degree.*$/, '').trim();

            nodes.push({ type: 'file', name: fileName, path: rel.replace('.md', ''), source });
        }
    }
    return nodes.sort((a,b) => (a.type === b.type ? a.name.localeCompare(b.name) : (a.type === 'folder' ? -1 : 1)));
}

// Build Navigation
const navigation = buildNodeTree(HANDOUTS_DIR, '../handouts');

// Generate Breadcrumbs
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
    buildId: `HANDOUTS-${new Date().getTime()}`,
    totalFiles: (function count(nodes) { return nodes.reduce((acc, n) => acc + (n.type === 'file' ? 1 : count(n.children || [])), 0); })(navigation),
    timestamp: new Date().toISOString()
};

const payload = JSON.stringify({ stats, navigation, breadcrumbs }, null, 2);

// Inject into index.html
if (fs.existsSync(INDEX_HTML)) {
    let html = fs.readFileSync(INDEX_HTML, 'utf-8');
    const regex = /(<!-- SIDEBAR-DATA-START -->)[\s\S]*?(<!-- SIDEBAR-DATA-END -->)/;
    fs.writeFileSync(INDEX_HTML, html.replace(regex, `$1\n    <script id="vault-data" type="application/json">\n    ${payload}\n    </script>\n    $2`));
    console.log(`✅ Index Update Complete! Injected ${stats.totalFiles} documents from 'handouts/' into the Vault.`);
} else {
    console.error("❌ Error: 'markdown/index.html' not found.");
}
