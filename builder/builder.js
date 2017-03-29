const path = require('path');
const themeBuilder = require('theme-builder');

const saveThemeScssFile = require('./saveThemeScssFile');
const runWebpackAndCopyFilesToFinalDestination = require('./runWebpackAndCopyFilesToFinalDestination');
const webpackConfig = require('./webpack.config');

const defaultThemeYamlPath = path.join(__dirname, '..', 'themes', '_default.yaml');
const defaultOutputThemeFile = path.join(__dirname, '..', 'themes', 'theme.scss');
/**
 * Triggers the build process.
 *
 * @module builder
 * @param {String}  cssDir     Destination folder for the ui-bundle.css
 * @param {String}  jsDir      Destination folder for the ui-bundle.js
 * @param {Array, String}  themeFile  Path where a custom YAML w/ styles' definitions
 * @param {Boolean} watch      Flag to determine if it should run in 'watch' mode
 * @return {Promise}
 */
module.exports = ({ cssDir, environment = 'development', output = defaultOutputThemeFile, jsDir, themeFile, watch }) => {
  let themeFiles = [defaultThemeYamlPath];
  if (themeFile) {
    themeFiles = themeFiles.concat(themeFile);
  }

  const uiKitBuilder = themeBuilder({
    format: 'scss',
    prefix: 'tx',
  });

  return uiKitBuilder
    .merge(themeFiles)
    .then(uiKitBuilder.build)
    .then(result => saveThemeScssFile(output, result))
    .then(() => runWebpackAndCopyFilesToFinalDestination({
      cssDir,
      jsDir,
      watch,
      webpackConfig,
      webpackNodeEnv: { 'process.env.NODE_ENV': environment },
    }));
};
