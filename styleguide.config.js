const path = require('path');

module.exports = {
  title: 'Travix styleguide',
  assetsDir: 'dist',
  template: './styleguide.html',
  components: 'components/**/*.js',
  skipComponentsWithoutExample: true,
  require: ['babel-polyfill'],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: path.join(__dirname, 'node_modules'),
          use: 'babel-loader?compact=true',
        },
      ],
    },
  },
};
