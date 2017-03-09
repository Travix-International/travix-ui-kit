const getStylesAndSaveTheme = require('./getStylesAndSaveTheme');
const runWebpackAndCopyFilesToFinalDestination = require('./runWebpackAndCopyFilesToFinalDestination');
const webpackConfig = require('./webpack.config');

/**
 * Triggers the build process.
 *
 * @module builder
 * @param {String}  cssDir     Destination folder for the ui-bundle.css
 * @param {String}  jsDir      Destination folder for the ui-bundle.js
 * @param {String}  themeFile  Path where a custom YAML w/ styles' definitions
 * @param {Boolean} watch      Flag to determine if it should run in 'watch' mode
 * @return {Promise}
 */
module.exports = ({ cssDir, environment = 'development', jsDir, themeFile, watch }) => {
  return getStylesAndSaveTheme(themeFile, watch)
    .then(() => runWebpackAndCopyFilesToFinalDestination({
      cssDir,
      jsDir,
      watch,
      webpackConfig,
      webpackNodeEnv: { 'process.env.NODE_ENV': environment },
    }));
};
