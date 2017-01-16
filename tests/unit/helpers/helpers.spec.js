const getClassNamesWithMods = require('../../../components/_helpers.js').getClassNamesWithMods;

describe('helpers', () => {
  describe('#getClassNamesWithMods()', () => {
    it('#1 should return class with mods for strings as class and array as mods', () => {
      expect(getClassNamesWithMods('test', ['first', 'second'])).toBe('test test--first test--second');
    });
    it('#2 should return class with mods for strings as array of classes and array as mods', () => {
      expect(getClassNamesWithMods(['test', 'test2'], ['first', 'second'])).toBe('test test2 test--first test--second');
    });
  });
});
