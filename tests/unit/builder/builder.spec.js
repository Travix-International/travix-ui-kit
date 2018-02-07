const path = require('path');
const builder = require('../../../builder');
const { outputFile } = require('fs-extra');
const runWebpackAndCopyFilesToFinalDestination = require('../../../builder/runWebpackAndCopyFilesToFinalDestination');
const webpackConfig = require('../../../builder/webpack.config');

jest.mock('../../../builder/runWebpackAndCopyFilesToFinalDestination', () => jest.fn(() => Promise.resolve()));
jest.mock('fs-extra', () => ({
  outputFile: jest.fn(),
}));
jest.mock('theme-builder', () => () => ({
  watch: (file, cb) => cb('theme-builder-result-watch'),
  build: jest.fn(() => Promise.resolve('theme-builder-result')),
}));
jest.mock('travix-themes', () => ({
  getAvailableSets: jest.fn(() => [{ brand: 'cheaptickets', affiliate: 'default' }]),
  getThemeFiles: jest.fn(() => ['theme-file.yaml']),
}));

describe('Builder › builder.js', () => {
  afterEach(() => {
    outputFile.mockReset();
  });

  it('should call the dependencies\' functions with the proper args', async () => {
    const args = {
      cssDir: 'myCssDir',
      environment: process.env.NODE_ENV,
      jsDir: 'myJsDir',
      themePackage: 'travix-themes',
      watch: true,
    };

    const result = builder(args);

    expect(result).toBeInstanceOf(Promise);

    await result;

    const outputPath = path.join(__dirname, '../../../dist/');

    expect(outputFile).toHaveBeenCalledTimes(8);
    expect(outputFile.mock.calls).toEqual([
      [path.join(outputPath, 'default.css'), 'theme-builder-result-watch'],
      [path.join(outputPath, 'default.js'), 'window.TravixTheme = "theme-builder-result-watch";'],
      [path.join(outputPath, 'cheaptickets-default.css'), 'theme-builder-result-watch'],
      [path.join(outputPath, 'cheaptickets-default.js'), 'window.TravixTheme = "theme-builder-result-watch";'],
      [path.join(outputPath, 'default.css'), 'theme-builder-result'],
      [path.join(outputPath, 'default.js'), 'window.TravixTheme = "theme-builder-result";'],
      [path.join(outputPath, 'cheaptickets-default.css'), 'theme-builder-result'],
      [path.join(outputPath, 'cheaptickets-default.js'), 'window.TravixTheme = "theme-builder-result";'],
    ]);

    expect(runWebpackAndCopyFilesToFinalDestination).toHaveBeenCalledWith({
      cssDir: args.cssDir,
      jsDir: args.jsDir,
      watch: args.watch,
      webpackConfig: webpackConfig,
      webpackNodeEnv: { 'process.env.NODE_ENV': process.env.NODE_ENV },
    });
  });

  it('should pass on the environment if different from the process.env.NODE_ENV', async () => {
    const args = {
      cssDir: 'myCssDir',
      environment: 'myOwnEnv',
      jsDir: 'myJsDir',
      themePackage: 'travix-themes',
    };

    const result = builder(args);

    expect(result).toBeInstanceOf(Promise);

    await result;

    expect(runWebpackAndCopyFilesToFinalDestination).toHaveBeenCalledWith({
      cssDir: args.cssDir,
      jsDir: args.jsDir,
      watch: args.watch,
      webpackConfig: webpackConfig,
      webpackNodeEnv: { 'process.env.NODE_ENV': 'myOwnEnv' },
    });
  });

  it('should default the environment to "development" when not provided', async () => {
    const args = {
      cssDir: 'myCssDir',
      jsDir: 'myJsDir',
      themePackage: 'travix-themes',
      watch: true,
    };

    const result = builder(args);

    expect(result).toBeInstanceOf(Promise);

    await result;

    const outputPath = path.join(__dirname, '../../../dist/');

    expect(outputFile).toHaveBeenCalledTimes(8);
    expect(outputFile.mock.calls).toEqual([
      [path.join(outputPath, 'default.css'), 'theme-builder-result-watch'],
      [path.join(outputPath, 'default.js'), 'window.TravixTheme = "theme-builder-result-watch";'],
      [path.join(outputPath, 'cheaptickets-default.css'), 'theme-builder-result-watch'],
      [path.join(outputPath, 'cheaptickets-default.js'), 'window.TravixTheme = "theme-builder-result-watch";'],
      [path.join(outputPath, 'default.css'), 'theme-builder-result'],
      [path.join(outputPath, 'default.js'), 'window.TravixTheme = "theme-builder-result";'],
      [path.join(outputPath, 'cheaptickets-default.css'), 'theme-builder-result'],
      [path.join(outputPath, 'cheaptickets-default.js'), 'window.TravixTheme = "theme-builder-result";'],
    ]);

    expect(runWebpackAndCopyFilesToFinalDestination).toHaveBeenCalledWith({
      cssDir: args.cssDir,
      jsDir: args.jsDir,
      watch: args.watch,
      webpackConfig: webpackConfig,
      webpackNodeEnv: { 'process.env.NODE_ENV': 'development' },
    });
  });
});
