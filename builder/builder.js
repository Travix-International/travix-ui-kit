const path = require('path');
const { outputFile } = require('fs-extra');
const themeBuilder = require('theme-builder');

const runWebpackAndCopyFilesToFinalDestination = require('./runWebpackAndCopyFilesToFinalDestination');
const webpackConfig = require('./webpack.config');

const defaultThemeYamlPath = path.join(__dirname, '..', 'themes', '_default.yaml');
const defaultOutputThemeFile = path.join(__dirname, '..', 'dist', 'theme.css');

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
    output = defaultOutputThemeFile,
    themeFile,
    watch,
  } = options;

  const themeFiles = [defaultThemeYamlPath].concat(themeFile).filter(Boolean);

  const builder = themeBuilder({
    format: 'cssvars',
    prefix: 'tx',
  });

  const outputThemeJs = path.join(
    path.dirname(output),
    `${path.basename(output, path.extname(output))}.js`
  );
  const builderJS = themeBuilder({
    format: 'jsflat',
    prefix: 'tx',
  });

  if (watch) {
    builder.watch(themeFiles, (result) => {
      outputFile(output, result);
    });

    builderJS.watch(themeFiles, (result) => {
      outputFile(outputThemeJs, `window.TravixTheme = ${JSON.stringify(result)};`);
    });
  }

  return Promise.all([
    buildThemeCSS(builder, themeFiles, output),
    buildThemeJS(builderJS, themeFiles, outputThemeJs),
  ]).then(() => runWebpackAndCopyFilesToFinalDestination({
    cssDir,
    jsDir,
    watch,
    webpackConfig,
    webpackNodeEnv: { 'process.env.NODE_ENV': environment },
  }));
};
