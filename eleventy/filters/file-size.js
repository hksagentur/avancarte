const fs = require('node:fs');
const path = require('node:path');

const prettyBytes = require('pretty-bytes');

/**
 * Get the human readable size of a given file.
 *
 * @param {string} uri The URI of the file to inspect.
 * @param {string} [locale=null] The locale to use.
 * @returns {?string}
 */
function fileSize(uri, locale = null) {
  locale = locale || this.ctx?.locale?.replace('_', '-');

  const stats = fs.statSync(path.join('src', uri), {
    throwIfNoEntry: false
  });

  if (! stats) {
    return null;
  }

  return prettyBytes(stats.size, {locale});
}

module.exports = fileSize;
