const fs = require('fs');
const path = require('path');

/**
 * Copies a given file from one path to another.
 *
 * @module copyToFinalDestination
 * @param {String} originalPath Source path to be copied
 * @param {String} finalPath    Destination folder to copy the originalPath to.
 * @return {Promise}
 */
module.exports = ({ originalPath, finalPath }) => new Promise((resolve, reject) => {
  if (!finalPath) {
    resolve();
    return;
  }

  const copyTo = path.join(finalPath, path.basename(originalPath));
  fs.readFile(originalPath, (readErr, content) => {
    if (readErr) {
      reject(readErr);
      return;
    }

    fs.writeFile(copyTo, content, (writeErr) => {
      if (writeErr) {
        reject(writeErr);
        return;
      }

      resolve();
    });
  });
});
