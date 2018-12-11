const routes  = require('../server/routes');
const config  = require('../config');
const urlJoin = require('url-join');
const removeUrlLastSlash = require('./removeUrlLastSlash')

/**
 * Returns an object that contains the page and the pathname related to
 * a given path for a given language. The path must be written using the
 * parameter config.lang.internalRoutesLang.
 * Returns an empty object if there is no matching route
 * @param path
 * @param lang
 * @returns {*}
 */
module.exports = (path = '/', lang = config.lang.default) => {
  const matchingRouteConfig = routes[path];
  if (matchingRouteConfig) {
    let pathname = matchingRouteConfig.langRoutes && matchingRouteConfig.langRoutes[lang]
      ? matchingRouteConfig.langRoutes[lang]
      : path;

    if (config.lang.enableRouteTranslation) {
      pathname =  urlJoin('/', lang, pathname);
    }

    return {
      pathname: removeUrlLastSlash(pathname),
      ...matchingRouteConfig,
    };
  }
  return {};

};