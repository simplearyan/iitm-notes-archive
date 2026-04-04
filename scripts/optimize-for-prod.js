const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const contentDir = path.join(__dirname, '../content');
const customCssPath = path.join(__dirname, '../assets/iframe-custom.css');

// Load custom CSS content
let customCss = '';
if (fs.existsSync(customCssPath)) {
    customCss = fs.readFileSync(customCssPath, 'utf8');
}

function injectStyles(htmlPath) {
    if (!fs.existsSync(htmlPath)) return;
    try {
        let html = fs.readFileSync(htmlPath, 'utf8');
        const styleBlock = `/* CUSTOM-IFRAME-STYLE-START */\n${customCss}\n/* CUSTOM-IFRAME-STYLE-END */`;
        
        if (html.includes('/* CUSTOM-IFRAME-STYLE-START */')) {
            const regex = /\/\* CUSTOM-IFRAME-STYLE-START \*\/[\s\S]*?\/\* CUSTOM-IFRAME-STYLE-END \*\//;
            html = html.replace(regex, styleBlock);
        } else {
            html = html.replace('</head>', `<style type="text/css">${styleBlock}</style>\n</head>`);
        }
        
        fs.writeFileSync(htmlPath, html);
        console.log(`✅ Styled: ${path.relative(contentDir, htmlPath)}`);
    } catch (e) {
        console.error(`❌ CSS injection failed for ${htmlPath}: ${e.message}`);
    }
}

function tryUnzip(itemPath, targetDir) {
    // Try 7z first (Windows specific common paths included)
    const possible7zPaths = [
        '7z', '7za',
        '"C:\\Program Files\\7-Zip\\7z.exe"',
        '"C:\\Program Files (x86)\\7-Zip\\7z.exe"'
    ];

    for (const cmd of possible7zPaths) {
        try {
            execSync(`${cmd} x -y "${itemPath}" -o"${targetDir}"`, { stdio: 'ignore' });
            return true;
        } catch (e) { continue; }
    }

    // Fallback to standard 'unzip' if 7z fails
    try {
        execSync(`unzip -o "${itemPath}" -d "${targetDir}"`, { stdio: 'ignore' });
        return true;
    } catch (e) { return false; }
}

function optimizeDir(currentPath) {
    if (!fs.existsSync(currentPath)) return;
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            // Re-sync CSS to already unzipped folders
            const potentialHtml = path.join(itemPath, 'index.html');
            if (fs.existsSync(potentialHtml)) injectStyles(potentialHtml);
            optimizeDir(itemPath);
        } else if (itemPath.endsWith('.zip.html')) {
            console.log(`Optimizing Archive: ${item}...`);
            const cleanFolderName = item.replace(/\.u\.zip\.html$/, '').replace(/\.zip\.html$/, '').trim();
            const targetDir = path.join(currentPath, cleanFolderName);
            
            if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);

            if (tryUnzip(itemPath, targetDir)) {
                injectStyles(path.join(targetDir, 'index.html'));
                fs.unlinkSync(itemPath);
                console.log(`🚀 Fully Processed: ${item}`);
            } else {
                console.error(`❌ Could not unzip ${item}. Ensure 7-Zip or unzip is installed.`);
            }
        }
    }
}

console.log('--- Starting Production Optimization & Styling ---');
optimizeDir(contentDir);
console.log('--- Done! Refresh your page. ---');
