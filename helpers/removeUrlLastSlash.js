/**
 * Everything is in the name!
 * @param url
 * @returns {string}
 */
module.exports = (url = '') => url.length > 1 ? url.replace(/\/$/, '') : '/';