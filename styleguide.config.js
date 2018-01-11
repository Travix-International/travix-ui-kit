const path = require('path');

module.exports = {
  title: 'Travix styleguide',
  assetsDir: 'dist',
  template: './styleguide.html',
  components: 'components/**/*.js',
  skipComponentsWithoutExample: true,
  getExampleFilename: function(componentPath) {
    return componentPath.replace(/\.jsx?$/, '.md');
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
  },
};
