jest.mock('fs');

const fs = require('fs');
const copyToFinalDestination = require('../../../builder/copyToFinalDestination');

describe('Builder › copyToFinalDestination.js', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    fs.readFile = jest.fn();
    fs.writeFile = jest.fn();
  });

  it('resolves immediately when no finalPath is provided', () => {
    return copyToFinalDestination({ originalPath: 'fake/original/path.ext' })
      .then(() => {
        expect(fs.readFile).not.toHaveBeenCalled();
        expect(fs.writeFile).not.toHaveBeenCalled();
      });
  });

  it('reads the original file and writes it into the final path w/ the same basename', () => {
    fs.readFile.mockImplementation((filePath, cb) => cb(null, 'fake content'));
    fs.writeFile.mockImplementation((filePath, content, cb) => cb(null));

    return copyToFinalDestination({
      originalPath: 'fake/original/path.ext',
      finalPath: 'fake/final/path/',
    }).then(() => {
      expect(fs.readFile).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalled();
    });
  });

  it('rejects promise when it is unable to read file', () => {
    fs.readFile.mockImplementation((filePath, cb) => cb(new Error('Read error')));

    return copyToFinalDestination({
      originalPath: 'fake/original/path.ext',
      finalPath: 'fake/final/path/',
    }).catch((err) => {
      expect(fs.readFile).toHaveBeenCalled();
      expect(fs.writeFile).not.toHaveBeenCalled();
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Read error');
    });
  });

  it('rejects promise when it is unable to write file', () => {
    fs.readFile.mockImplementation((filePath, cb) => cb(null, 'fake content'));
    fs.writeFile.mockImplementation((filePath, content, cb) => cb(new Error('Write error')));

    return copyToFinalDestination({
      originalPath: 'fake/original/path.ext',
      finalPath: 'fake/final/path/',
    }).catch((err) => {
      expect(fs.readFile).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalled();
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Write error');
    });
  });
});
