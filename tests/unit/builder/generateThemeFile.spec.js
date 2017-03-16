jest.mock('fs');
jest.mock('../../../builder/saveThemeScssFile', () => jest.fn(() => Promise.resolve()));
jest.mock('theme-builder', () => jest.fn(() => ['scss', 'content']));

const fs = require('fs');

fs.readFileSync = jest.fn();
fs.readFileSync.mockImplementation(() => 'default: 1');

const generateThemeFile = require('../../../builder/generateThemeFile');
const saveThemeScssFile = require('../../../builder/saveThemeScssFile');
const themeBuilder = require('theme-builder');


describe('Builder › generateThemeFile.js', () => {
  beforeEach(() => {
    jest.resetModules();
    fs.readFile = jest.fn();
    themeBuilder.mockClear();
    saveThemeScssFile.mockClear();
  });

  it('reads the file, calls the theme-builder fand saveThemeScssFile functions', () => {
    const fakeFile = 'fake/file.yml';
    fs.readFile.mockImplementation((filePath, options, cb) => cb(null, 'fake file content'));
    return generateThemeFile(fakeFile)
      .then(() => {
        expect(fs.readFileSync).toHaveBeenCalled();
        expect(fs.readFile).toHaveBeenCalled();
        expect(fs.readFile.mock.calls[0][0]).toBe(fakeFile);
        expect(fs.readFile.mock.calls[0][1]).toEqual({ encoding: 'utf-8' });
        expect(fs.readFile.mock.calls[0][2]).toBeInstanceOf(Function);

        expect(themeBuilder).toHaveBeenCalled();
        expect(themeBuilder).toHaveBeenCalledWith('fake file content', 'scss', {
          prefix: 'tx',
          defaultThemeYaml: 'default: 1',
        });

        expect(saveThemeScssFile).toHaveBeenCalled();
        expect(saveThemeScssFile).toHaveBeenCalledWith('scss\ncontent');
      });
  });

  it('rejects when it has a read error', () => {
    const fakeFile = 'fake/file.yml';
    fs.readFile.mockImplementation((filePath, options, cb) => cb(new Error('Read error')));
    return generateThemeFile(fakeFile)
      .catch((err) => {
        expect(fs.readFile).toHaveBeenCalled();
        expect(fs.readFile.mock.calls[0][0]).toBe(fakeFile);
        expect(fs.readFile.mock.calls[0][1]).toEqual({ encoding: 'utf-8' });
        expect(fs.readFile.mock.calls[0][2]).toBeInstanceOf(Function);

        expect(themeBuilder).not.toHaveBeenCalled();
        expect(saveThemeScssFile).not.toHaveBeenCalled();

        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Read error');
      });
  });

  it('rejects when themeBuilder throws an error', () => {
    const fakeFile = 'fake/file.yml';
    fs.readFile.mockImplementation((filePath, options, cb) => cb(null, 'fake file content'));
    themeBuilder.mockImplementation(() => { throw new Error('ThemeBuilder error'); });
    return generateThemeFile(fakeFile)
      .catch((err) => {
        expect(fs.readFile).toHaveBeenCalled();
        expect(fs.readFile.mock.calls[0][0]).toBe(fakeFile);
        expect(fs.readFile.mock.calls[0][1]).toEqual({ encoding: 'utf-8' });
        expect(fs.readFile.mock.calls[0][2]).toBeInstanceOf(Function);

        expect(themeBuilder).toHaveBeenCalled();
        expect(saveThemeScssFile).not.toHaveBeenCalled();

        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('ThemeBuilder error');
      });
  });
});
