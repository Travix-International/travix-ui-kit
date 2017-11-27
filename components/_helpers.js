const modSep = '_';

function getClassNamesWithMods(baseClass = '', ...modsSet) {
  let classes = [].concat(baseClass);
  baseClass = classes[0];

  modsSet.forEach((mods) => {
    if (mods instanceof Array) {
      classes = classes
        .concat(mods.filter(Boolean).map(mode => `${baseClass}${modSep}${mode}`));
    } else {
      Object.keys(mods).forEach((mode) => {
        if (mods[mode]) {
          classes.push(`${baseClass}${modSep}${mode}`);
        }
      });
    }
  });

  return classes.join(' ');
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

/**
 * Eject real custom users props from props
 *
 * @method ejectOtherProps
 * @param {Object} props conponent props.
 * @param {Object} propTypes conponent props types.
 * @return {Object} custom props.
 */
function ejectOtherProps(props, propTypes) {
  return Object.keys(props)
    .filter(x => Object.keys(propTypes).indexOf(x) < 0)
    .reduce((prev, item) => {
      return { ...prev, [item]: props[item] };
    }, {});
}

// Exports
export default {
  ejectOtherProps,
  getClassNamesWithMods,
  getDataAttributes,
  leftPad,
  normalizeDate,
};
