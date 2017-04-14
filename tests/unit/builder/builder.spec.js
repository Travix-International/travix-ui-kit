const path = require('path');
const builder = require('../../../builder');
const saveThemeScssFile = require('../../../builder/saveThemeScssFile');
const runWebpackAndCopyFilesToFinalDestination = require('../../../builder/runWebpackAndCopyFilesToFinalDestination');
const webpackConfig = require('../../../builder/webpack.config');

jest.mock('../../../builder/runWebpackAndCopyFilesToFinalDestination', () => jest.fn(() => Promise.resolve()));
jest.mock('../../../builder/saveThemeScssFile', () => jest.fn());
jest.mock('theme-builder', () => () => ({
  watch: (file, cb) => cb(),
  build: jest.fn(() => Promise.resolve('theme-builder-result')),
}));

describe('Builder › builder.js', () => {
  it('should call the dependencies\' functions with the proper args', () => {
    const args = {
      cssDir: 'myCssDir',
      environment: process.env.NODE_ENV,
      jsDir: 'myJsDir',
      themeFile: 'myThemeFile',
      watch: true,
    };

    const result = builder(args);

    expect(result).toBeInstanceOf(Promise);

    return result.then(() => {
      const outputPath = path.join(__dirname, '../../../themes/theme.scss');
      expect(saveThemeScssFile).toHaveBeenCalledWith(outputPath, 'theme-builder-result');

      expect(runWebpackAndCopyFilesToFinalDestination).toHaveBeenCalledWith({
        cssDir: args.cssDir,
        jsDir: args.jsDir,
        watch: args.watch,
        webpackConfig: webpackConfig,
        webpackNodeEnv: { 'process.env.NODE_ENV': process.env.NODE_ENV },
      });
    });
  });

  it('should pass on the environment if different from the process.env.NODE_ENV', () => {
    const args = {
      cssDir: 'myCssDir',
      environment: 'myOwnEnv',
      jsDir: 'myJsDir',
    };

    const result = builder(args);

    expect(result).toBeInstanceOf(Promise);

    return result.then(() => {
      expect(runWebpackAndCopyFilesToFinalDestination).toHaveBeenCalledWith({
        cssDir: args.cssDir,
        jsDir: args.jsDir,
        watch: args.watch,
        webpackConfig: webpackConfig,
        webpackNodeEnv: { 'process.env.NODE_ENV': 'myOwnEnv' },
      });
    });
  });

  it('should default the environment to "development" when not provided', () => {
    const args = {
      cssDir: 'myCssDir',
      jsDir: 'myJsDir',
      themeFile: 'myThemeFile',
      watch: true,
      output: '/output/path/to/file.scss',
    };

    const result = builder(args);

    expect(result).toBeInstanceOf(Promise);

    return result.then(() => {
      expect(saveThemeScssFile).toHaveBeenCalledWith(args.output, 'theme-builder-result');

      expect(runWebpackAndCopyFilesToFinalDestination).toHaveBeenCalledWith({
        cssDir: args.cssDir,
        jsDir: args.jsDir,
        watch: args.watch,
        webpackConfig: webpackConfig,
        webpackNodeEnv: { 'process.env.NODE_ENV': 'development' },
      });
    });
  });
});
