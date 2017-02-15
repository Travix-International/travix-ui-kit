const fs = require('fs');
const path = require('path');
const generateThemeFile = require('./generateThemeFile');

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
  const yamlFile = themeFile || path.join(__dirname, '..', 'themes', '_default.yaml');

  if (isWatchEnabled) {
    fs.watch(yamlFile, { persistent: true }, () => {
      /** TODO: Do proper error handling on watch mode */
      generateThemeFile(yamlFile).catch(reject);
    });
  }

  generateThemeFile(yamlFile).then(resolve).catch(reject);
});
