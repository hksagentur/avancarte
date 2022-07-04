const path = require('node:path');

/**
 * Extract the extension from a given file path.
 *
 * @param {string} uri The URI of the file to inspect.
 * @returns {string}
 */
function fileExtension(uri) {
  return path
    .extname(path.join('src', uri))
    .slice(1);
}

module.exports = fileExtension;
