const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

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
    filename: 'bundle.js',
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
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'sass-loader', 'postcss-loader'],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer],
      },
    }),
  ],
};
