const path = require('path');
const { outputFile } = require('fs-extra');
const themeBuilder = require('theme-builder');
const { getAvailableSets, getThemeFiles } = require('travix-themes');

const runWebpackAndCopyFilesToFinalDestination = require('./runWebpackAndCopyFilesToFinalDestination');
const webpackConfig = require('./webpack.config');

const defaultThemeYamlPath = path.join(__dirname, '..', 'themes', '_default.yaml');
const defaultOutputThemeDir = path.join(__dirname, '..', 'dist');

function buildTheme(builder, themeFiles) {
  return builder.build(themeFiles);
}

function buildThemeCSS(builder, themeFiles, output) {
  return buildTheme(builder, themeFiles)
    .then(result => outputFile(output, result));
}

function buildThemeJS(builder, themeFiles, output) {
  return buildTheme(builder, themeFiles)
    .then(result => outputFile(output, `window.TravixTheme = ${JSON.stringify(result)};`));
}

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
    watch,
  } = options;

  const bundles = [{
    themeFiles: [defaultThemeYamlPath],
    output: path.join(defaultOutputThemeDir, 'default'),
  }];
  getAvailableSets().forEach((themeOptions) => {
    bundles.push({
      themeFiles: [defaultThemeYamlPath].concat(getThemeFiles(themeOptions)),
      output: path.join(defaultOutputThemeDir, `${themeOptions.brand}-${themeOptions.affiliate}`),
    });
  });

  const builder = themeBuilder({
    format: 'cssvars',
    prefix: 'tx',
  });

  const builderJS = themeBuilder({
    format: 'jsflat',
    prefix: 'tx',
  });

  if (watch) {
    bundles.forEach(({ themeFiles, output }) => {
      builder.watch(themeFiles, (result) => {
        outputFile(`${output}.css`, result);
      });

      builderJS.watch(themeFiles, (result) => {
        outputFile(`${output}.js`, `window.TravixTheme = ${JSON.stringify(result)};`);
      });
    });
  }

  return Promise.all(bundles.reduce((result, { themeFiles, output }) => {
    return result.concat(
      buildThemeCSS(builder, themeFiles, `${output}.css`),
      buildThemeJS(builderJS, themeFiles, `${output}.js`),
    );
  }, [])).then(() => runWebpackAndCopyFilesToFinalDestination({
    cssDir,
    jsDir,
    watch,
    webpackConfig,
    webpackNodeEnv: { 'process.env.NODE_ENV': environment },
  }));
};
