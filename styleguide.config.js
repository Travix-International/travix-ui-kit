const webpack = require('webpack');
const path = require('path');
const { getAvailableSets } = require('travix-themes');

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
    Logo: path.join(__dirname, '/components/logoRenderer'),
  },
  require: ['babel-polyfill'],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: path.join(__dirname, 'components'),
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
