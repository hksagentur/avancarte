/**
 * Translate a given translation key.
 *
 * @param {string} key The key of the localized string.
 * @param {object} [data={}] A collectiion of values for placeholder strings.
 * @returns {string}
 */
function trans(key, data = {}) {
  const languages = this.ctx?.languages ?? {};
  const lang = this.ctx?.lang ?? 'en';
  const language = languages?.[lang] ?? {};

  let translation = language?.translations?.[key] ?? key;

  for (const [placeholder, replacement] of Object.entries(data)) {
    translation = translation.replace(`:${placeholder}`, replacement);
  }

  return translation;
}

module.exports = trans;
