const fs = require('fs');
const saveThemeScssFile = require('../../../builder/saveThemeScssFile');

jest.mock('fs');

describe('Builder › saveThemeScssFile.js', () => {
  beforeEach(() => {
    jest.resetModules();
    fs.writeFile = jest.fn();
  });

  it('saves the SCSS provided as themes/theme.scss', () => {
    fs.writeFile.mockImplementation((filepath, content, cb) => cb(null));
    const outputFile = '/output/path/to/theme.scss';
    return saveThemeScssFile(outputFile, 'fakeScssContent')
      .then(() => {
        expect(fs.writeFile).toHaveBeenCalled();
        expect(fs.writeFile.mock.calls[0][0]).toBe(outputFile);
        expect(fs.writeFile.mock.calls[0][1]).toBe('fakeScssContent');
        expect(fs.writeFile.mock.calls[0][2]).toBeInstanceOf(Function);
      });
  });

  it('rejects the Promise in case of write error', () => {
    fs.writeFile.mockImplementation((filepath, content, cb) => cb(new Error('Write error')));
    const outputFile = '/output/path/to/theme.scss';
    return saveThemeScssFile(outputFile, 'fakeScssContent')
      .catch((err) => {
        expect(fs.writeFile).toHaveBeenCalled();
        expect(fs.writeFile.mock.calls[0][0]).toBe(outputFile);
        expect(fs.writeFile.mock.calls[0][1]).toBe('fakeScssContent');
        expect(fs.writeFile.mock.calls[0][2]).toBeInstanceOf(Function);

        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Write error');
      });
  });
});
