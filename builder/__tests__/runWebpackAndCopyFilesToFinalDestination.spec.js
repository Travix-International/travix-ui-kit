const runnerStub = {
  run: jest.fn(cb => cb(null, 'fakeStats')),
  watch: jest.fn((opts, cb) => cb(null, 'fakeStats')),
};
const mockWebpack = jest.fn(() => {
  return runnerStub;
});
mockWebpack.DefinePlugin = jest.fn(() => ({}));

jest.mock('webpack', () => mockWebpack);
jest.mock('../copyToFinalDestination', () => jest.fn(() => Promise.resolve()));

const copyToFinalDestination = require('../copyToFinalDestination');
const path = require('path');
const runWebpackAndCopyFilesToFinalDestination = require('../runWebpackAndCopyFilesToFinalDestination');

describe('Builder › runWebpackAndCopyFilesToFinalDestination.js', () => {
  beforeEach(() => {
    jest.resetModules();
    copyToFinalDestination.mockClear();
  });

  it('reads the file, calls the theme-builder fand saveThemeScssFile functions', () => {
    const fakeArgs = {
      cssDir: 'fake/css/dir/',
      jsDir: 'fake/js/dir/',
      watch: false,
      webpackConfig: {
        output: {
          path: 'fakePath',
        },
        plugins: [],
      },
      webpackNodeEnv: 'fakeWebpackNodeEnv',
    };

    return runWebpackAndCopyFilesToFinalDestination(fakeArgs)
      .then((stats) => {
        expect(runnerStub.run).toHaveBeenCalled();
        expect(runnerStub.run.mock.calls[0][0]).toBeInstanceOf(Function);

        expect(copyToFinalDestination).toHaveBeenCalledTimes(2);
        expect(copyToFinalDestination).toHaveBeenCalledWith({
          finalPath: fakeArgs.cssDir,
          originalPath: path.join(fakeArgs.webpackConfig.output.path, 'ui-bundle.css'),
        });
        expect(copyToFinalDestination).toHaveBeenCalledWith({
          finalPath: fakeArgs.jsDir,
          originalPath: path.join(fakeArgs.webpackConfig.output.path, 'ui-bundle.js'),
        });
        expect(stats).toBe('fakeStats');
      });
  });

  it('sets the watcher', () => {
    const fakeArgs = {
      cssDir: 'fake/css/dir/',
      jsDir: 'fake/js/dir/',
      watch: true,
      webpackConfig: {
        output: {
          path: 'fakePath',
        },
        plugins: [],
      },
      webpackNodeEnv: 'fakeWebpackNodeEnv',
    };

    return runWebpackAndCopyFilesToFinalDestination(fakeArgs)
      .then((stats) => {
        expect(runnerStub.watch).toHaveBeenCalled();
        expect(runnerStub.watch.mock.calls[0][0]).toEqual({});
        expect(runnerStub.watch.mock.calls[0][1]).toBeInstanceOf(Function);

        expect(copyToFinalDestination).toHaveBeenCalledTimes(2);
        expect(copyToFinalDestination).toHaveBeenCalledWith({
          finalPath: fakeArgs.cssDir,
          originalPath: path.join(fakeArgs.webpackConfig.output.path, 'ui-bundle.css'),
        });
        expect(copyToFinalDestination).toHaveBeenCalledWith({
          finalPath: fakeArgs.jsDir,
          originalPath: path.join(fakeArgs.webpackConfig.output.path, 'ui-bundle.js'),
        });
        expect(stats).toBe('fakeStats');
      });
  });

  it('rejects when it has an error executing the runnerFn', () => {
    const fakeArgs = {
      cssDir: 'fake/css/dir/',
      jsDir: 'fake/js/dir/',
      watch: false,
      webpackConfig: {
        output: {
          path: 'fakePath',
        },
        plugins: [],
      },
      webpackNodeEnv: 'fakeWebpackNodeEnv',
    };

    runnerStub.run.mockImplementation(cb => cb(new Error('Runner error')));

    return runWebpackAndCopyFilesToFinalDestination(fakeArgs)
      .catch((err) => {
        expect(runnerStub.run).toHaveBeenCalled();
        expect(runnerStub.run.mock.calls[0][0]).toBeInstanceOf(Function);

        expect(copyToFinalDestination).not.toHaveBeenCalled();
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Runner error');
      });
  });

  it('rejects when it has an error executing the runnerFn (watch = true)', () => {
    const fakeArgs = {
      cssDir: 'fake/css/dir/',
      jsDir: 'fake/js/dir/',
      watch: true,
      webpackConfig: {
        output: {
          path: 'fakePath',
        },
        plugins: [],
      },
      webpackNodeEnv: 'fakeWebpackNodeEnv',
    };

    runnerStub.watch.mockImplementation((opts, cb) => cb(new Error('Runner error')));

    return runWebpackAndCopyFilesToFinalDestination(fakeArgs)
      .catch((err) => {
        expect(runnerStub.watch).toHaveBeenCalled();
        expect(runnerStub.watch.mock.calls[0][0]).toEqual({});
        expect(runnerStub.watch.mock.calls[0][1]).toBeInstanceOf(Function);

        expect(copyToFinalDestination).not.toHaveBeenCalled();
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Runner error');
      });
  });
});
