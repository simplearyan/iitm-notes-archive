const fs = require('fs');
const path = require('path');

// 1. Define paths relative to the scripts/ folder
const contentDir = path.join(__dirname, '../content');
const indexPath = path.join(__dirname, '../index.html');

// 2. Recursive function to crawl folders and build a JSON tree
function buildTree(currentPath, relativePath = '') {
    const stats = fs.statSync(currentPath);
    
    if (stats.isDirectory()) {
        const children = fs.readdirSync(currentPath)
            .map(child => buildTree(path.join(currentPath, child), path.join(relativePath, child)))
            .filter(Boolean); // Remove null/empty folders
        
        if (children.length === 0) return null;
        
        return {
            type: 'folder',
            name: path.basename(currentPath),
            children: children
        };
    } else if (currentPath.endsWith('.html')) {
        // Clean up the messy SingleFile name
        let cleanName = path.basename(currentPath)
            .replace(/_ IITM Online Degree.*\.html$/, '')
            .replace(/\.u\.zip\.html$/, '')
            .replace(/\.html$/, '')
            .trim();
        
        // Ensure web-safe forward slashes for the file path
        let webPath = 'content/' + relativePath.replace(/\\/g, '/');
        
        return {
            type: 'file',
            name: cleanName,
            path: encodeURI(webPath)
        };
    }
    return null;
}

// 3. Generate the JSON Data
const rawTree = buildTree(contentDir);
// If the root is a folder, extract its children so we don't have a top-level "content" accordion
const treeData = rawTree && rawTree.children ? rawTree.children : [];
const jsonData = JSON.stringify(treeData, null, 4);

// 4. Inject JSON into index.html
let indexContent = fs.readFileSync(indexPath, 'utf-8');

// Regex to replace everything between the DATA-START and DATA-END comments
const regex = /(<!-- DATA-START -->)[\s\S]*?(<!-- DATA-END -->)/;
const newContent = indexContent.replace(regex, `$1\n<script id="site-data" type="application/json">\n${jsonData}\n</script>\n$2`);

fs.writeFileSync(indexPath, newContent, 'utf-8');

console.log('✅ Sidebar JSON map updated successfully! Nested folders have been linked.');