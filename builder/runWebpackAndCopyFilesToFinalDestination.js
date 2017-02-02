const copyToFinalDestination = require('./copyToFinalDestination');
const path = require('path');
const webpack = require('webpack');

/**
 * @module runWebpackAndCopyFilesToFinaDestination
 * @param {Object} options                Object containing the configuration props.
 * @param {String} options.cssDir         Folder where to place the ui-bundle.css
 * @param {String} options.jsDir          Folder where to place the ui-bundle.js
 * @param {String} options.watch          Flag that enables the 'watch mode' on Webpack. Default: false
 * @param {Object} options.webpackConfig  Webpack configuration object
 * @param {Object} options.webpackNodeEnv Webpack NODE_ENV configuration
 * @return {Promise}
 */
module.exports = ({ cssDir, jsDir, watch, webpackConfig, webpackNodeEnv }) => new Promise((resolve, reject) => {
  webpackConfig.plugins.push(new webpack.DefinePlugin(webpackNodeEnv));
  webpackConfig.context = __dirname;

  const runner = webpack(webpackConfig);
  const runnerFn = watch ? runner.watch.bind(runner, {}) : runner.run.bind(runner);

  runnerFn((err, stats) => {
    if (err) {
      reject(err);
      return;
    }

    copyToFinalDestination({
      finalPath: jsDir,
      originalPath: path.join(webpackConfig.output.path, 'ui-bundle.js'),
    }).then(() => copyToFinalDestination({
      finalPath: cssDir,
      originalPath: path.join(webpackConfig.output.path, 'ui-bundle.css'),
    })).then(() => {
      resolve(stats);
    }).catch(reject);
  });
});
