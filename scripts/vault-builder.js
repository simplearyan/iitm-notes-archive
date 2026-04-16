#!/usr/bin/env node

/**
 * 🛠️ Ultra-Simple Reading Vault Builder
 * ─────────────────────────────────────────────────────────────────────────────
 * Mirroring the logic of 'generate-sidebar.js' for maximum stability.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');

// 1. Absolute Paths (Relative to this script)
const SCRIPTS_DIR = __dirname;
const ROOT_DIR = path.join(SCRIPTS_DIR, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const VAULT_DIR = path.join(ROOT_DIR, 'markdown');
const EXTRACTED_DIR = path.join(VAULT_DIR, 'extracted');
const MANUAL_DIR = path.join(VAULT_DIR, 'manual');
const UI_PATH = path.join(VAULT_DIR, 'index.html');

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

/**
 * 🕵️ Phase 1: Heavy-Duty Archive Extraction
 */
function extractAll() {
    console.log(`📂 Searching for course materials in: ${CONTENT_DIR}`);
    
    function findZips(dir) {
        let results = [];
        if (!fs.existsSync(dir)) return results;
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
            const full = path.join(dir, item.name);
            if (item.isDirectory()) results = results.concat(findZips(full));
            else if (item.name.toLowerCase().endsWith('.u.zip.html')) results.push(full);
        }
        return results;
    }

    const zips = findZips(CONTENT_DIR);
    console.log(`📦 Found ${zips.length} archives.`);

    zips.forEach((zipPath) => {
        try {
            const html = fs.readFileSync(zipPath, 'utf-8');
            const dom = new JSDOM(html);
            const doc = dom.window.document;
            const main = doc.querySelector('.content-wrapper') || doc.body;
            if (!main) return;

            main.querySelectorAll('.no-print, nav, footer, script').forEach(el => el.remove());
            const md = turndown.turndown(main.innerHTML);
            const title = doc.title.replace(/_ IITM Online Degree.*$/, '').trim();

            const relPath = path.relative(CONTENT_DIR, zipPath).replace(/\.u\.zip\.html$/i, '.md');
            const target = path.join(EXTRACTED_DIR, relPath);
            
            fs.mkdirSync(path.dirname(target), { recursive: true });
            fs.writeFileSync(target, `---\ntitle: "${title}"\n---\n\n# ${title}\n\n${md}`);
            console.log(`✅ Extracted: ${title}`);
        } catch (e) {
            console.error(`❌ Failed ${path.basename(zipPath)}: ${e.message}`);
        }
    });
}

/**
 * 🌲 Phase 2: Simple Tree Building (Mirroring generate-sidebar.js)
 */
function buildTree(currentPath, source, relativePath = '') {
    if (!fs.existsSync(currentPath)) return null;
    const stats = fs.statSync(currentPath);

    if (stats.isDirectory()) {
        const children = fs.readdirSync(currentPath)
            .filter(child => !child.startsWith('.') && child !== 'assets')
            .map(child => buildTree(path.join(currentPath, child), source, relativePath ? `${relativePath}/${child}` : child))
            .filter(Boolean);

        if (children.length === 0) return null;

        return {
            type: 'folder',
            name: path.basename(currentPath).replace(/_+/g, ' ').replace(/\s*\(\d{1,2}_\d{1,2}_\d{4}.*?\)/, '').trim(),
            path: relativePath,
            children: children.sort((a,b) => {
                if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
                return a.name.localeCompare(b.name);
            })
        };
    } else if (currentPath.endsWith('.md')) {
        // Read title from frontmatter or first H1
        const content = fs.readFileSync(currentPath, 'utf-8');
        const titleMatch = content.match(/^title:\s*"(.*)"/m) || content.match(/^#+\s*(.*)/m);
        const name = titleMatch ? titleMatch[1].trim() : path.basename(currentPath, '.md');

        return {
            type: 'file',
            name: name,
            path: relativePath.replace(/\.md$/, ''),
            source: source
        };
    }
    return null;
}

/**
 * 🚀 Build & Inject
 */
function main() {
    console.log('🏛️ --- VAULT MASTER BUILD ---');
    
    // 1. Cleanup & Extract
    if (fs.existsSync(EXTRACTED_DIR)) fs.rmSync(EXTRACTED_DIR, { recursive: true, force: true });
    extractAll();

    // 2. Build Nav
    const extractedNavNodes = buildTree(EXTRACTED_DIR, 'extracted') || { children: [] };
    const manualNavNodes = buildTree(MANUAL_DIR, 'manual') || { children: [] };
    
    // Flatten the roots so we don't have "extracted" as a top-level accordion
    const finalNavigation = [
        ...(extractedNavNodes.children || (extractedNavNodes.type === 'folder' ? extractedNavNodes.children : [extractedNavNodes])),
        ...(manualNavNodes.children || (manualNavNodes.type === 'folder' ? manualNavNodes.children : [manualNavNodes]))
    ].filter(Boolean);

    // 3. Stats & Breadcrumbs
    const allMarkdownFiles = (dir) => {
        let results = [];
        if (!fs.existsSync(dir)) return results;
        const list = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of list) {
            const full = path.join(dir, item.name);
            if (item.isDirectory()) results = results.concat(allMarkdownFiles(full));
            else if (item.name.endsWith('.md')) results.push(full);
        }
        return results;
    };

    const stats = {
        buildId: new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19),
        totalFiles: allMarkdownFiles(EXTRACTED_DIR).length + allMarkdownFiles(MANUAL_DIR).length,
        extractedFiles: allMarkdownFiles(EXTRACTED_DIR).length,
        manualFiles: allMarkdownFiles(MANUAL_DIR).length
    };

    const breadcrumbs = {};
    const mapper = (nodes, trail = []) => {
        nodes.forEach(n => {
            const currentTrail = [...trail, n.name];
            breadcrumbs[n.path] = currentTrail;
            if (n.children) mapper(n.children, currentTrail);
        });
    };
    mapper(finalNavigation);

    // 4. Atomic Injection
    const jsonData = JSON.stringify({ stats, navigation: finalNavigation, breadcrumbs }, null, 2);
    let html = fs.readFileSync(UI_PATH, 'utf-8');
    const regex = /(<!-- SIDEBAR-DATA-START -->)[\s\S]*?(<!-- SIDEBAR-DATA-END -->)/;
    const newHtml = html.replace(regex, `$1\n    <script id="vault-data" type="application/json">\n    ${jsonData}\n    </script>\n    $2`);
    fs.writeFileSync(UI_PATH, newHtml);

    console.log(`✅ VAULT COMPLETE: ${stats.totalFiles} documents injected.`);
}

main();
