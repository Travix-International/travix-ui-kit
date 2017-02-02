const fs = require('fs');
const saveThemeScssFile = require('./saveThemeScssFile');
const themeBuilder = require('theme-builder');

/**
 * Generates the themes/theme.scss file, based on a given YAML file.
 *
 * @module generateThemeFile
 * @param {String} yamlFile File path to a YAML file with the styles' definitions.
 * @return {Promise}
 */
module.exports = (yamlFile) => {
  return new Promise((resolve, reject) => {
    fs.readFile(yamlFile, { encoding: 'utf-8' }, (err, content) => {
      if (err) {
        reject(err);
        return;
      }

      const themeChunks = themeBuilder(content, 'scss', { prefix: 'tx' });
      resolve(themeChunks.join('\n'));
    });
  }).then(saveThemeScssFile);
};
