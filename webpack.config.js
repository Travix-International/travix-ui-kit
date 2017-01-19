const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const outputDir = './dist/';

module.exports = {
  entry: {
    dist: [
      './components/index.scss',
      './components/index.js',
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
    loaders: [
      {
        test: /\.jsx?$/i,
        exclude: /(node_modules)/,
        loader: 'babel',
      },
      {
        test: /\.s?css$/i,
        exclude: /(node_modules)/,
        loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass']),
      },
    ],
  },

  postcss: () => {
    return [autoprefixer('last 2 version')];
  },

  plugins: [
    new ExtractTextPlugin('ui-bundle.css'),
  ],
};
