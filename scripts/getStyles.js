const fs = require('fs');
const path = require('path');
const themeBuilder = require('theme-builder');

const root = path.join(__dirname, '/../');
const themeScssFile = path.join(root, 'themes/theme.scss');

function getStyles(currentThemePath) {
  currentThemePath = currentThemePath || path.join(root, 'themes/_default.yaml');

  const themeYaml = fs.readFileSync(currentThemePath);
  const themeScss = themeBuilder(themeYaml, 'scss', { prefix: 'tx' });

  // Could be removed in future if pass it in data for sass render func
  fs.writeFileSync(themeScssFile, themeScss.join('\n'));
}

module.exports = {
  getStyles: getStyles,
};
