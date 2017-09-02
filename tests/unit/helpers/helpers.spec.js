const getClassNamesWithMods = require('../../../components/_helpers.js').getClassNamesWithMods;
const getDataAttributes = require('../../../components/_helpers.js').getDataAttributes;
const getNum = require('../../../components/_helpers.js').getNum;

describe('helpers', () => {
  describe('#getClassNamesWithMods()', () => {
    it('#1 should return class with mods for strings as class and array as mods', () => {
      expect(getClassNamesWithMods('test', ['first', 'second'])).toBe('test test_first test_second');
    });
    it('#2 should return class with mods for strings as array of classes and array as mods', () => {
      expect(getClassNamesWithMods(['test', 'test2'], ['first', 'second'])).toBe('test test2 test_first test_second');
    });
    it('#3 should return only an array with the classes provided in the first arg', () => {
      expect(getClassNamesWithMods(['test', 'test2'])).toBe('test test2');
    });
    it('#4 should return empty string when baseClass was not provided', () => {
      expect(getClassNamesWithMods()).toBe('');
    });
    it('#5 should return class with mods for strings as class and object as mods', () => {
      expect(getClassNamesWithMods('test', { first: true, second: false })).toBe('test test_first');
    });
    it('#6 should return class with mods for strings as array of classes and object and array as mods', () => {
      expect(getClassNamesWithMods(
        ['test', 'test2'],
        ['first', 'second'],
        { third: true, fourth: false }
      )).toBe('test test2 test_first test_second test_third');
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

  describe('#getNum', () => {
    it('should return an integer part of string with px', () => {
      const str = '12px';
      const expected = 12;

      expect(getNum(str)).toEqual(expected);
    });

    it('should return an integer from string containing 0', () => {
      const str = '0';
      const expected = 0;

      expect(getNum(str)).toEqual(expected);
    });
  });
});
