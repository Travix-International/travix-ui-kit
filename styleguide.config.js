module.exports = {
  title: 'Travix styleguide',
  assetsDir: 'dist',
  template: './styleguide.html',
  components: 'components/**/*.js',
  skipComponentsWithoutExample: true,
  getExampleFilename: function(componentPath) {
    return componentPath.replace(/\.jsx?$/, '.md');
  },

  updateWebpackConfig: function(webpackConfig, env) {
    webpackConfig.module.loaders.push(
      {
        test: /\.jsx?$/,
        include: __dirname + '/components',
        loader: 'babel'
      }
    );

    return webpackConfig;
  }
};
