module.exports = {
  title: 'Travix styleguide',
  assetsDir: 'dist',
  template: './styleguide.html',
  components: 'components/**/*.js',
  skipComponentsWithoutExample: true,
  getExampleFilename: function(componentPath) {
    return componentPath.replace(/\.jsx?$/, '.md');
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: __dirname + '/components',
          use: 'babel-loader',
        },
      ],
    },
  },
};
