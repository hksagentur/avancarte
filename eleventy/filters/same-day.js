const { DateTime } = require('luxon');

/**
 * Convert the given user input to a date object.
 *
 * @param {string|Date} date The date to parse.
 * @returns {DateTime}
 */
function parseDate(date) {
  return (date instanceof Date)
    ? DateTime.fromJSDate(date)
    : DateTime.fromISO(date);
}

/**
 * Determine whether two dates have the same calendar day.
 *
 * @param {string|Date} date The first date.
 * @param {string|Date} other The second date.
 * @returns {boolean}
 */
function isSameDay(date, other) {
  if (!date || !other) {
    return false;
  }

  return parseDate(date).hasSame(parseDate(other), 'day');
}

module.exports = isSameDay;
