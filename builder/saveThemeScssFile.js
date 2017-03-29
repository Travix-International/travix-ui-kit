const fs = require('fs');

/**
 * @module saveThemeScssFile
 * @param {String} themeScss SCSS content to be stored as themes/theme.scss
 * @return {Promise}
 */
module.exports = (file, themeScss) => new Promise((resolve, reject) => {
  fs.writeFile(file, themeScss, (err) => {
    if (err) {
      reject(err);
      return;
    }

    resolve();
  });
});
