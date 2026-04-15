#!/usr/bin/env node

/**
 * 📝 Standalone Markdown Extraction & Index Pipeline
 * 
 * Runs ONLY:
 * - HTML to Markdown extraction
 * - Index generation  
 * - Index injection into HTML
 * 
 * Does NOT:
 * - Commit changes
 * - Create PRs
 * - Deploy to gh-pages
 * - Build CSS
 * 
 * ✅ Perfect for:
 * - Local development and testing
 * - Custom CI/CD pipelines
 * - Running extraction without git side effects
 * 
 * Usage:
 *   node scripts/extract-and-index.js
 *   OR
 *   npm run markdown:all
 */

const { execSync } = require('child_process');
const path = require('path');

// ANSI colors for output
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(emoji, message, color = 'reset') {
  const colorCode = COLORS[color] || COLORS.reset;
  const reset = COLORS.reset;
  console.log(`${colorCode}${emoji} ${message}${reset}`);
}

function section(title) {
  console.log('\n' + COLORS.bright + COLORS.blue + '─'.repeat(60) + COLORS.reset);
  log('📋', title, 'bright');
  console.log(COLORS.bright + COLORS.blue + '─'.repeat(60) + COLORS.reset + '\n');
}

function run(name, command) {
  try {
    log('🚀', name, 'cyan');
    execSync(command, { 
      stdio: 'inherit', 
      cwd: path.join(__dirname, '..'),
      shell: process.platform === 'win32' ? 'powershell.exe' : '/bin/bash'
    });
    log('✅', `${name} completed`, 'green');
    return true;
  } catch (err) {
    log('❌', `${name} failed`, 'yellow');
    console.error(err.message);
    return false;
  }
}

async function main() {
  section('Markdown Extraction & Index Pipeline');

  const steps = [
    {
      name: 'Extract Markdown from Archives',
      command: process.platform === 'win32'
        ? 'node --expose-gc --max-old-space-size=6144 scripts\\extract-markdown.js'
        : 'node --expose-gc --max-old-space-size=6144 scripts/extract-markdown.js'
    },
    {
      name: 'Generate Markdown Index',
      command: process.platform === 'win32'
        ? 'node --max-old-space-size=2048 scripts\\generate-markdown-index.js'
        : 'node --max-old-space-size=2048 scripts/generate-markdown-index.js'
    },
    {
      name: 'Inject Index into HTML',
      command: process.platform === 'win32'
        ? 'node scripts\\inject-markdown-index.js'
        : 'node scripts/inject-markdown-index.js'
    },
  ];

  let failed = false;
  for (const step of steps) {
    if (!run(step.name, step.command)) {
      failed = true;
      break;
    }
    console.log();
  }

  section('Pipeline Summary');

  if (failed) {
    log('❌', 'Pipeline failed! Check errors above.', 'yellow');
    process.exit(1);
  }

  log('✨', 'Markdown extraction and indexing complete!', 'green');
  log('📁', 'Output: markdown/ directory', 'bright');
  log('📊', 'Files ready for:', 'bright');
  console.log('   • Local testing');
  console.log('   • Artifact upload');
  console.log('   • Manual gh-pages deployment');
  console.log();

  log('💡', 'Tip: Add to git or deploy as needed', 'cyan');
  console.log();
}

main().catch(err => {
  log('❌', 'Fatal error:', 'yellow');
  console.error(err);
  process.exit(1);
});
