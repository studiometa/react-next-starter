const qs = require('qs');

/**
 * Get a pathname and searchState and
 * build an url that contains the search query
 * @param {string} pathname the pathname of the url
 * @param {object} searchState the search state has key->value object
 * @returns {string}
 */
module.exports = (pathname = '', searchState = {}) =>
  searchState ? `${pathname}?${qs.stringify(searchState)}` : '';