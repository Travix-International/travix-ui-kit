const getClassNamesWithMods = require('../../../components/_helpers.js').getClassNamesWithMods;
const getDataAttributes = require('../../../components/_helpers.js').getDataAttributes;

describe('helpers', () => {
  describe('#getClassNamesWithMods()', () => {
    it('#1 should return class with mods for strings as class and array as mods', () => {
      expect(getClassNamesWithMods('test', ['first', 'second'])).toBe('test test_first test_second');
    });
    it('#2 should return class with mods for strings as array of classes and array as mods', () => {
      expect(getClassNamesWithMods(['test', 'test2'], ['first', 'second'])).toBe('test test2 test_first test_second');
    });
  });

  describe('#getDataAttributes()', () => {
    it('returns an object with all properties of a given object prefixed with data- and its values', () => {
      expect(getDataAttributes({ first: 'test', second: 'second value' })).toEqual({
        'data-first': 'test',
        'data-second': 'second value',
      });
    });

    it('returns an empty object when no object is provided or an empty object is provided', () => {
      expect(getDataAttributes()).toEqual({});
      expect(getDataAttributes({})).toEqual({});
    });
  });
});
