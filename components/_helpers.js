const modSep = '_';

function getClassNamesWithMods(baseClass, mods = []) {
  baseClass = [].concat(baseClass);

  return [
    ...baseClass,
    ...(mods.filter(Boolean).map(m => `${baseClass[0]}${modSep}${m}`)),
  ].join(' ');
}

/**
 * Creates an object of data-attributes based on another given attributes' object.
 *
 * @param {Object} attributes Attributes to be added to a component as a data-*
 * @return {Object}           Returns an object with the attributes properly prefixed with 'data-'
 */
function getDataAttributes(attributes = {}) {
  return Object.keys(attributes).reduce((ret, key) => {
    ret[`data-${key.toLowerCase()}`] = attributes[key];
    return ret;
  }, {});
}

/**
 * @function leftPad
 * @param {Number} value The value to be left padded
 * @return {String}      The value with a leading 0 if it's between 1 - 9
 */
function leftPad(value, maxLength = 2, leftPaddedBy = '0') {
  const valueStringified = value.toString();
  if (valueStringified.length >= maxLength) {
    return valueStringified;
  }

  return leftPaddedBy.repeat(maxLength - valueStringified.length) + valueStringified;
}

/**
 * Receives a date object and normalizes it to the proper hours, minutes,
 * seconds and milliseconds.
 *
 * @method normalizeDate
 * @param {Date} dateObject Date object to be normalized.
 * @param {Number} hours Value to set the hours to. Defaults to 0
 * @param {Number} minutes Value to set the minutes to. Defaults to 0
 * @param {Number} seconds Value to set the seconds to. Defaults to 0
 * @param {Number} milliseconds Value to set the milliseconds to. Defaults to 0
 * @return {Date} The normalized date object.
 */
function normalizeDate(dateObject, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
  dateObject.setHours(hours);
  dateObject.setMinutes(minutes);
  dateObject.setSeconds(seconds);
  dateObject.setMilliseconds(milliseconds);
  return dateObject;
}

// Exports
export default {
  getClassNamesWithMods,
  getDataAttributes,
  leftPad,
  normalizeDate,
};
