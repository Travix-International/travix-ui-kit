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

// Exports
export default {
  getClassNamesWithMods,
  getDataAttributes,
};
