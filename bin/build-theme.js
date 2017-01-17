const path = require('path');
const fs = require('fs');
const root = path.join(__dirname, '/../');
const getStyles = require('../scripts/getStyles.js').getStyles;
const themeFile = process.env.THEME_PATH || path.join(root, 'themes/_default.yaml');
const appName = 'Build Theme';

function buildTheme() {
  console.log(`[${appName}]:`, 'Using theme ' + themeFile);
  getStyles(process.env.THEME_PATH || path.join(root, 'themes/_default.yaml'));
  console.log(`[${appName}]:`, 'Building styles done');
}

if (~process.argv.indexOf('--watch')) {
  console.log(`[${appName}]:`, 'Watching theme file changes');
  fs.watchFile(themeFile, (curr, prev) => {
    console.log(`[${appName}]:`, themeFile, 'was changed. Rebuilding...');
    buildTheme();
  });
}

buildTheme();
