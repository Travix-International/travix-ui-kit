jest.mock('fs');
jest.mock('../../../builder/generateThemeFile', () => jest.fn(() => Promise.resolve()));
const fs = require('fs');
const generateThemeFile = require('../../../builder/generateThemeFile');
const getStylesAndSaveTheme = require('../../../builder/getStylesAndSaveTheme');
const path = require('path');

describe('Builder › getStylesAndSaveTheme.js', () => {
  beforeEach(() => {
    jest.resetModules();
    fs.watch = jest.fn();
    generateThemeFile.mockClear();
  });

  it('sets the yamlFile\'s basename to "_default.yaml" when no themeFile is provided', () => {
    return getStylesAndSaveTheme()
      .then(() => {
        expect(fs.watch).not.toHaveBeenCalled();
        expect(generateThemeFile).toHaveBeenCalled();
        expect(path.basename(generateThemeFile.mock.calls[0][0])).toBe('_default.yaml');
      });
  });

  it('calls generateThemeFile and resolves without watching files (when watch = false)', () => {
    return getStylesAndSaveTheme('fake/yaml/file.yml', false)
      .then(() => {
        expect(fs.watch).not.toHaveBeenCalled();
        expect(generateThemeFile).toHaveBeenCalled();
        expect(generateThemeFile).toHaveBeenCalledWith('fake/yaml/file.yml');
      });
  });

  it('calls generateThemeFile and watches the yaml file (when watch = true)', () => {
    return getStylesAndSaveTheme('fake/yaml/file.yml', true)
      .then(() => {
        expect(fs.watch).toHaveBeenCalled();
        expect(fs.watch.mock.calls[0][0]).toBe('fake/yaml/file.yml');
        expect(fs.watch.mock.calls[0][1]).toEqual({ persistent: true });
        expect(fs.watch.mock.calls[0][2]).toBeInstanceOf(Function);

        expect(generateThemeFile).toHaveBeenCalled();
        expect(generateThemeFile).toHaveBeenCalledWith('fake/yaml/file.yml');
      });
  });

  it('calls generateThemeFile when executing the watcher\'s callback (when watch = true)', () => {
    fs.watch.mockImplementation((filePath, opts, cb) => cb()); // Automatically yields

    return getStylesAndSaveTheme('fake/yaml/file.yml', true)
      .then(() => {
        expect(fs.watch).toHaveBeenCalled();
        expect(fs.watch.mock.calls[0][0]).toBe('fake/yaml/file.yml');
        expect(fs.watch.mock.calls[0][1]).toEqual({ persistent: true });
        expect(fs.watch.mock.calls[0][2]).toBeInstanceOf(Function);

        expect(generateThemeFile).toHaveBeenCalledTimes(2);
        expect(generateThemeFile).toHaveBeenCalledWith('fake/yaml/file.yml');
      });
  });
});
