const fs = require('fs');
const path = require('path');

/**
 * @module saveThemeScssFile
 * @param {String} themeScss SCSS content to be stored as themes/theme.scss
 * @return {Promise}
 */
module.exports = themeScss => new Promise((resolve, reject) => {
  fs.writeFile(path.join(__dirname, '..', 'themes', 'theme.scss'), themeScss, (err) => {
    if (err) {
      reject(err);
      return;
    }

    resolve();
  });
});
