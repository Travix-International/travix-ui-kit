const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const outputDir = path.join(__dirname, '..', 'dist');

/**
 * @module webpack.config
 * @type {Object}
 */
module.exports = {
  bail: true,
  entry: {
    dist: [
      '../components/index.scss',
      '../components/index.js',
    ],
  },

  output: {
    path: outputDir,
    filename: 'ui-bundle.js',
    library: 'TravixUIKit',
    libraryTarget: 'var',
  },

  externals: {
    react: 'React',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.s?css$/i,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer('last 2 version')],
              },
            },
            'sass-loader',
          ],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('ui-bundle.css'),
  ],
};
