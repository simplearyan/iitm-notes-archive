const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const contentDir = path.join(__dirname, '../content');

function optimizeDir(currentPath) {
    const items = fs.readdirSync(currentPath);
    for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            optimizeDir(itemPath);
        } else if (itemPath.endsWith('.zip.html')) {
            console.log(`Optimizing: ${item}`);
            
            // Clean the folder name by removing .u.zip.html
            const cleanFolderName = item.replace(/\.u\.zip\.html$/, '').replace(/\.zip\.html$/, '').trim();
            const targetDir = path.join(currentPath, cleanFolderName);
            
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir);
            }

            try {
                // Use 7z command for vastly superior polyglot support (HTML + ZIP)
                execSync(`7z x -y "${itemPath}" -o"${targetDir}"`);
                
                // Remove the bulky original file to save space
                fs.unlinkSync(itemPath);
                
                console.log(`✅ Extracted to ${targetDir}`);
            } catch (err) {
                console.error(`❌ Failed to extract ${item}: ${err.message}`);
                // If it fails, keep the original so the app doesn't completely break
            }
        }
    }
}

console.log('--- Starting Production Optimization ---');
console.log('Unpacking SingleFileZ archives to optimize TTFB...');
if (fs.existsSync(contentDir)) {
    optimizeDir(contentDir);
    console.log('--- Optimization Complete ---');
} else {
    console.warn('⚠️ Content directory not found!');
}
