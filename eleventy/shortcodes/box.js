/**
 * Render some boxed content.
 *
 * @param {string} content The content of the box.
 * @param {string} [title=''] The title of the boxed content.
 * @param {string} [style='light'] The background color of the boxed content.
 * @returns {string}
 */
function box(content, title='', style='tint') {
  const markup = `
    <div class="c-box / u-bg-${style}">
      ${title ? `<h3 class="c-box__title">${title}</h3>` : ''}
      ${content}
    </div>
  `;

  return markup.trim();
}

module.exports = box;
