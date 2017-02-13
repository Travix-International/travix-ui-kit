const modSep = '_';

function getClassNamesWithMods(baseClass, mods = []) {
  baseClass = [].concat(baseClass);

  return [
    ...baseClass,
    ...(mods.filter(Boolean).map(m => `${baseClass[0]}${modSep}${m}`)),
  ].join(' ');
}

// Exports
export default {
  getClassNamesWithMods,
};
