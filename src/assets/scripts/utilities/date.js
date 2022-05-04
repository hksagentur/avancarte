/**
 * Get the current time measured in the number of of milliseconds since the
 * ECMAScript epoch.
 *
 * @returns {number}
 */
export function time() {
  return (new Date()).getTime();
}
