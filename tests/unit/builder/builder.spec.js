jest.mock('../../../builder/getStylesAndSaveTheme', () => jest.fn(() => Promise.resolve()));
jest.mock('../../../builder/runWebpackAndCopyFilesToFinalDestination', () => jest.fn(() => Promise.resolve()));

const builder = require('../../../builder/builder');
const getStylesAndSaveTheme = require('../../../builder/getStylesAndSaveTheme');
const runWebpackAndCopyFilesToFinalDestination = require('../../../builder/runWebpackAndCopyFilesToFinalDestination');
const webpackConfig = require('../../../builder/webpack.config');

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
      expect(getStylesAndSaveTheme).toHaveBeenCalled();
      expect(getStylesAndSaveTheme).toHaveBeenCalledWith(args.themeFile, args.watch);

      expect(runWebpackAndCopyFilesToFinalDestination).toHaveBeenCalled();
      expect(runWebpackAndCopyFilesToFinalDestination).toHaveBeenCalledWith({
        cssDir: args.cssDir,
        jsDir: args.jsDir,
        watch: args.watch,
        webpackConfig: webpackConfig,
        webpackNodeEnv: { 'process.env.NODE_ENV': process.env.NODE_ENV },
      });
    });
  });
});
