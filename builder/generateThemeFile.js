const fs = require('fs');
const path = require('path');
const themeBuilder = require('theme-builder');
const saveThemeScssFile = require('./saveThemeScssFile');

const fileOpt = { encoding: 'utf-8' };
const defaultThemeYamlPath = path.join(__dirname, '..', 'themes', '_default.yaml');
const defaultThemeYaml = fs.readFileSync(defaultThemeYamlPath, fileOpt);

/**
 * Generates the themes/theme.scss file, based on a given YAML file.
 *
 * @module generateThemeFile
 * @param {String} yamlFile File path to a YAML file with the styles' definitions.
 * @return {Promise}
 */
module.exports = (yamlFile) => {
  return new Promise((resolve, reject) => {
    fs.readFile(yamlFile, fileOpt, (err, content) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const themeChunks = themeBuilder(content, 'scss', { prefix: 'tx', defaultThemeYaml });
        resolve(themeChunks.join('\n'));
      } catch (e) {
        reject(e);
      }
    });
  }).then(saveThemeScssFile);
};
