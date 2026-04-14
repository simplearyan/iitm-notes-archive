/**
 * build-vault.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Orchestrates the creation of the "Master Content Vault".
 *
 * Structure:
 *   /raw-archives/      - Original .u.zip.html files
 *   /optimized-modules/ - Extracted and styled folders
 *   /pdfs/              - All generated PDF versions
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VAULT_ROOT = path.resolve(__dirname, '../dist-vault');
const CONTENT_SRC = path.resolve(__dirname, '../content');
const OUTPUT_SRC = path.resolve(__dirname, '../output');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(item => {
      copyRecursiveSync(path.join(src, item), path.join(dest, item));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function runCommand(cmd, env = {}) {
  console.log(`\n🏃 Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit', env: { ...process.env, ...env } });
  } catch (e) {
    console.error(`❌ Command failed: ${cmd}`);
  }
}

(async () => {
  console.log('\n🏰 Starting Content Vault Construction...\n');

  // 1. Prepare Staging Area
  if (fs.existsSync(VAULT_ROOT)) fs.rmSync(VAULT_ROOT, { recursive: true, force: true });
  fs.mkdirSync(VAULT_ROOT, { recursive: true });

  // 2. Backup Raw Archives
  console.log('📦 Staging Raw Archives...');
  copyRecursiveSync(CONTENT_SRC, path.join(VAULT_ROOT, 'raw-archives'));

  // 3. Build & Stage Optimized Modules
  console.log('🚀 Storing Optimized Modules...');
  // We run this in KEEP_ARCHIVES mode so we don't delete our sources yet
  runCommand('node scripts/optimize-for-prod.js', { KEEP_ARCHIVES: 'true' });
  
  // Now copy the directories (filter out the raw zip.html files from the "optimized" folder to save space)
  copyRecursiveSync(CONTENT_SRC, path.join(VAULT_ROOT, 'optimized-modules'));
  
  // Cleanup raw archives from the "optimized" folder in vault to keep it clean
  const cleanOptimized = (dir) => {
    fs.readdirSync(dir).forEach(item => {
      const p = path.join(dir, item);
      if (fs.statSync(p).isDirectory()) cleanOptimized(p);
      else if (p.endsWith('.zip.html')) fs.unlinkSync(p);
    });
  };
  cleanOptimized(path.join(VAULT_ROOT, 'optimized-modules'));

  // 4. Generate & Stage PDFs
  console.log('📄 Staging PDF Suite...');
  // Standard
  runCommand('node scripts/html-to-pdf.js --output output/vault-pdf/standard --force');
  // v3 Ultra
  runCommand('node scripts/v3-pdf.js --output output/vault-pdf/v3-ultra --force');
  // v4 Compact
  runCommand('node scripts/v4-pdf.js --output output/vault-pdf/v4-compact --force');

  copyRecursiveSync(path.resolve(OUTPUT_SRC, 'vault-pdf'), path.join(VAULT_ROOT, 'pdfs'));

  console.log('\n🏰 Vault Construction Complete! Path: ./dist-vault\n');
})();
