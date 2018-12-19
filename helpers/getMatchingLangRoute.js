const routes             = require('../server/routes');
const config             = require('../config');
const urlJoin            = require('url-join');
const removeUrlLastSlash = require('./removeUrlLastSlash');

/**
 * Returns an object that contains the page and the pathname related to
 * a given routeName for a given language.
 * Returns an empty object if there is no matching route
 * @param routeName
 * @param lang
 * @returns {*}
 */
module.exports = (routeName = '/', lang = config.lang.default) => {

  const matchingRouteConfig = routes[routeName];
  if (config.lang.enabled !== true) {
    return {
      pathname: routeName,
      ...matchingRouteConfig
    }
  }

  if (matchingRouteConfig) {
    let pathname = matchingRouteConfig.langRoutes && matchingRouteConfig.langRoutes[lang]
      ? matchingRouteConfig.langRoutes[lang]
      : routeName;

    if (config.lang.enableRouteTranslation) {
      pathname = urlJoin('/', lang, pathname);
    }

    return {
      pathname: removeUrlLastSlash(pathname),
      ...matchingRouteConfig,
    };
  }
  return {};

};