const markdownIt = require('markdown-it');

const renderer = new markdownIt({
  html: true
});

/**
 * Parse and convert markdown content to HTML.
 *
 * @param {string} content The markdown content to render.
 * @returns {string}
 */
function markdown(content) {
  return renderer.render(content);
}

module.exports = markdown;
