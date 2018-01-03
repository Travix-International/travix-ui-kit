/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const { getAvailableSets } = require(process.argv[3] || 'travix-themes');

module.exports = {
  title: 'Travix styleguide',
  assetsDir: 'dist',
  template: './styleguide.html',
  components: 'components/**/*.js',
  skipComponentsWithoutExample: true,
  getExampleFilename: function(componentPath) {
    return componentPath.replace(/\.jsx?$/, '.md');
  },
  styleguideComponents: {
    Logo: path.join(__dirname, '/styleguideComponents/logoRenderer'),
  },
  require: ['babel-polyfill'],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: [path.join(__dirname, 'components'), path.join(__dirname, 'styleguideComponents')],
          use: 'babel-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        THEME_VARIANTS: JSON.stringify(getAvailableSets().map(
          ({ brand, affiliate }) => ({ value: `${brand}-${affiliate}`, label: `${brand}-${affiliate}` })
        )),
      }),
    ],
  },
};
