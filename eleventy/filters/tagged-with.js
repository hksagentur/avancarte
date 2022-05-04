const get = require('lodash/get');

/**
 * Find each item in a collection that is associated with one or multiple tags.
 *
 * @param {object[]} collection The collection to iterate.
 * @param {string|string[]} tag The tag to search for.
 * @returns {object?}
 */
function taggedWith(collection, tag) {
  const tags = Array.isArray(tag) ? tag : [tag];

  return collection.filter((item) => {
    const value = get(item, ['data', 'tags'], []);

    if (!Array.isArray(value)) {
      return false;
    }

    return tags.every((tag) => value.includes(tag));
  });
}

module.exports = taggedWith;
