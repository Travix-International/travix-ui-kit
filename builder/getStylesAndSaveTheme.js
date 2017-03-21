const fs = require('fs');
const path = require('path');
const generateThemeFile = require('./generateThemeFile');

const defaultTheme = path.join(__dirname, '..', 'themes', '_default.yaml');
/**
 * Triggers the generation of the theme file (theme.scss)
 * and handles the watch mode.
 *
 * @module getStylesAndSaveTheme
 * @param {String}  [themeFile]      Path to a custom YAML file with styles' definitions.
 * @param {Boolean} [isWatchEnabled] Flag that enables the 'watch mode' when true. Default: false.
 * @return {Promise}
 */
module.exports = (themeFile, isWatchEnabled) => new Promise((resolve, reject) => {
  const yamlFile = themeFile || defaultTheme;

  if (isWatchEnabled) {
    fs.watchFile(yamlFile, () => {
      generateThemeFile(yamlFile)
        .then(() => {
          console.log(`Detected changes on ${yamlFile} and rebuilt themes/theme.scss`); // eslint-disable-line
        })
        .catch(console.error); // eslint-disable-line
    });
  }

  generateThemeFile(yamlFile).then(resolve).catch(reject);
});
