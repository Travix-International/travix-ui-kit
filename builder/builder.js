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
module.exports = (options) => {
  const {
    cssDir,
    environment = 'development',
    jsDir,
    output = defaultOutputThemeFile,
    themeFile,
    watch,
  } = options;

  const themeFiles = [defaultThemeYamlPath].concat(themeFile).filter(Boolean);

  const builder = themeBuilder({
    format: 'scss',
    prefix: 'tx',
  });

  if (watch) {
    builder.watch(themeFiles, (result) => {
      saveThemeScssFile(output, result);
    });
  }

  return builder.build(themeFiles)
    .then(result => saveThemeScssFile(output, result))
    .then(() => runWebpackAndCopyFilesToFinalDestination({
      cssDir,
      jsDir,
      watch,
      webpackConfig,
      webpackNodeEnv: { 'process.env.NODE_ENV': environment },
    }));
};
