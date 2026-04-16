#!/usr/bin/env node

/**
 * 🏛️ Markdown Vault Master Engine
 * 
 * ONE SCRIPT TO RULE THEM ALL:
 * 1. Scans 'content/' for zip archives.
 * 2. Extracts HTML modules to Markdown.
 * 3. Scans 'markdown/manual/' for study notes.
 * 4. Generates 'markdown/index.json' (Sidebar + Search + Stats).
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');

// ============ Configuration ============
const CWD = process.cwd();
const INPUT_DIR = path.resolve(CWD, 'content');
const MARKDOWN_ROOT = path.resolve(CWD, 'markdown');
const EXTRACTED_DIR = path.resolve(MARKDOWN_ROOT, 'extracted');
const MANUAL_DIR = path.resolve(MARKDOWN_ROOT, 'manual');
const OUTPUT_PATH = path.resolve(MARKDOWN_ROOT, 'index.json');

const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
});

// Skip specific folders during scan
const SKIP_FOLDERS = ['.git', '.github', 'node_modules', 'assets'];

// ============ Utilities ============

function cleanFolderName(name) {
    return name
        .replace(/_+/g, ' ')
        .replace(/\s*\(\d{1,2}_\d{1,2}_\d{4}.*?\)/, '') // remove timestamps
        .replace(/\.u\.zip$/, '')
        .trim();
}

function extractFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};
    const yaml = match[1];
    const frontmatter = {};
    yaml.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
        }
    });
    return frontmatter;
}

function extractContentPreview(content) {
    const bodyMatch = content.replace(/^---\n[\s\S]*?\n---\n/, '');
    const titleMatch = bodyMatch.match(/^#+\s+(.+?)$/m);
    const title = titleMatch ? titleMatch[1] : null;
    const snippetMatch = bodyMatch.match(/^[^#]+/);
    const snippet = snippetMatch ? snippetMatch[0].trim().substring(0, 200) : '';
    return { title, snippet };
}

// ============ Engine Logic ============

/**
 * 🕵️ Recursively find all source zip-html files
 */
function collectSourceFiles(dir) {
    const results = [];
    if (!fs.existsSync(dir)) return results;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...collectSourceFiles(full));
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.u.zip.html')) {
            results.push(full);
        }
    }
    return results;
}

/**
 * 🏗️ Extract a single Multi-thread file to Markdown
 */
function extractFile(sourcePath) {
    try {
        const html = fs.readFileSync(sourcePath, 'utf-8');
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const mainContent = doc.querySelector('.content-wrapper') || doc.body;
        if (!mainContent) return null;

        // Clean up UI elements before conversion
        mainContent.querySelectorAll('.no-print, nav, footer, script').forEach(el => el.remove());

        const markdown = turndownService.turndown(mainContent.innerHTML);
        const title = doc.title.replace(/_ IITM Online Degree.*$/, '').trim();

        // Build output path mirroring the input structure
        const relativeToInput = path.relative(INPUT_DIR, sourcePath);
        const targetRelPath = relativeToInput.replace(/\.u\.zip\.html$/i, '.md');
        const targetFullPath = path.join(EXTRACTED_DIR, targetRelPath);

        fs.mkdirSync(path.dirname(targetFullPath), { recursive: true });
        
        const fileContent = `---\ntitle: "${title}"\nsource: "IITM MultiThread"\n---\n\n# ${title}\n\n${markdown}`;
        fs.writeFileSync(targetFullPath, fileContent);

        return {
            id: targetRelPath.replace(/\.md$/, ''),
            title: title,
            path: targetRelPath.replace(/\.md$/, ''),
            source: 'extracted',
            content: markdown,
            snippet: markdown.substring(0, 200).trim(),
            tags: []
        };
    } catch (err) {
        console.error(`❌ Error extracting ${sourcePath}: ${err.message}`);
        return null;
    }
}

/**
 * 📁 Scan existing manual markdown notes
 */
function scanManualDir(dirPath, relativePath = '') {
    const results = [];
    if (!fs.existsSync(dirPath)) return results;

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

        if (entry.isDirectory()) {
            if (!SKIP_FOLDERS.includes(entry.name)) {
                results.push(...scanManualDir(fullPath, relPath));
            }
        } else if (entry.name.endsWith('.md')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const frontmatter = extractFrontmatter(content);
            const { title, snippet } = extractContentPreview(content);
            const fileTitle = frontmatter.title || title || entry.name.replace(/\.md$/, '');
            const idPath = relPath.replace(/\.md$/, '');

            results.push({
                id: idPath,
                title: fileTitle,
                path: idPath,
                source: 'manual',
                content: content.replace(/^---[\s\S]*?---/, ''),
                snippet: snippet,
                tags: frontmatter.tags ? frontmatter.tags.split(',').map(t => t.trim()) : []
            });
        }
    }
    return results;
}

/**
 * 🌲 Reconstruct hierarchical tree from flat document list
 */
function buildTree(docs) {
    const root = [];
    const folderMap = {};

    // Sort docs alphabetically by id first
    docs.sort((a, b) => a.id.localeCompare(b.id));

    docs.forEach(doc => {
        const parts = doc.id.split(/[/\\]/); // Handle both slashes
        let currentLevel = root;
        let currentPath = '';

        for (let i = 0; i < parts.length - 1; i++) {
            const folderName = parts[i];
            const cleanFolder = cleanFolderName(folderName);
            currentPath = currentPath ? `${currentPath}/${folderName}` : folderName;

            if (!folderMap[currentPath]) {
                const newFolder = {
                    type: 'folder',
                    name: cleanFolder,
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

    // Final recursive sort: folders then files
    const sortNodes = (nodes) => {
        nodes.sort((a, b) => {
            if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
            return a.name.localeCompare(b.name);
        });
        nodes.forEach(n => { if (n.children) sortNodes(n.children); });
    };
    sortNodes(root);
    
    return root;
}

// ============ Execution Manager ============

async function main() {
    console.log('🚀 --- STARTING TITAN VAULT ENGINE ---');
    console.log(`📂 Work Dir: ${CWD}`);

    // 1. Extraction Phase
    console.log('\n📦 Phase 1: Extraction');
    const sourceFiles = collectSourceFiles(INPUT_DIR);
    console.log(`🔍 Found ${sourceFiles.length} course archives.`);
    
    const extractedDocs = [];
    sourceFiles.forEach((file, i) => {
        const doc = extractFile(file);
        if (doc) {
            extractedDocs.push(doc);
            if ((i + 1) % 10 === 0) console.log(`  Processing... ${i + 1}/${sourceFiles.length}`);
        }
    });
    console.log(`✅ Extracted ${extractedDocs.length} markdown modules.`);

    // 2. Manual Notes Phase
    console.log('\n📁 Phase 2: Manual Scan');
    const manualDocs = scanManualDir(MANUAL_DIR);
    console.log(`✅ Found ${manualDocs.length} manual study notes.`);

    // 3. Indexing Phase
    console.log('\n🔍 Phase 3: Indexing & Tree Generation');
    const allDocs = [...extractedDocs, ...manualDocs];
    const navTree = buildTree(allDocs);

    // Build Breadcrumbs
    const breadcrumbs = {};
    const walk = (nodes, trail = []) => {
        nodes.forEach(node => {
            const currentTrail = [...trail, node.name];
            breadcrumbs[node.path] = currentTrail;
            if (node.children) walk(node.children, currentTrail);
        });
    };
    walk(navTree);

    // 4. Output Phase
    const output = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        stats: {
            totalFiles: allDocs.length,
            extractedFiles: extractedDocs.length,
            manualFiles: manualDocs.length
        },
        navigation: navTree,
        search: {
            version: '2',
            documents: allDocs // Simplified for client-side Lunr
        },
        breadcrumbs: breadcrumbs
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

    console.log('\n✨ --- VAULT BUILD COMPLETE ---');
    console.log(`📄 Output: ${OUTPUT_PATH}`);
    console.log(`📊 Statistics:`);
    console.log(`   - Total Files: ${output.stats.totalFiles}`);
    console.log(`   - Extracted:   ${output.stats.extractedFiles}`);
    console.log(`   - Manual:      ${output.stats.manualFiles}`);
}

main().catch(err => {
    console.error('💥 FATAL ENGINE ERROR:', err);
    process.exit(1);
});
