const getRoutes = require('../server/routes');
const config    = require('../config');


const routes = getRoutes();


/**
 * Returns an object that contains the page and the pathname related to
 * a given path for a given language. The path must be written using the
 * parameter config.lang.internalRoutesLang.
 * Returns an empty object if there is no matching route
 * @param path
 * @param lang
 * @returns {*}
 */
module.exports = (path, lang) => {
  if (typeof routes.client[path] === 'object' && routes.client[path][lang] !== undefined) {
    return {
      pathname: routes.client[path][lang],
      page: routes.client[path].page,
    };
  }
  return {};

};