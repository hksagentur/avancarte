const { DateTime } = require('luxon');
const { get } = require('lodash');

/**
 * Find all items in the collection where the given date property is in the
 * future.
 *
 * @param {object[]} collection The collection to iterate.
 * @param {string} [key="date"] The name of the date property.
 * @param {string|DateTime} [today] The current date.
 * @returns {object[]}
 */
function upcoming(collection, key = 'date', today = DateTime.now()) {
  const date = (today instanceof Date)
    ? DateTime.fromJSDate(today)
    : DateTime.fromISO(today);

  return collection.filter((item) => {
    const value = get(item, key);

    if (value === undefined) {
      return false;
    }

    return value > date;
  });
}

module.exports = upcoming;
