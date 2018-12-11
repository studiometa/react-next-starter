const getRoutes          = require('../server/routes');
const config             = require('../config');
const removeUrlLastSlash = require('./removeUrlLastSlash');

const routes = getRoutes();

const getOrignalRoute = (routes, path, lang) => {
  if (routes && routes.client && routes[lang]) {
    if (routes.client[path] && routes.client[path][lang]) {
      let routePath = routes.client[path][lang].slice(config.lang.enableRouteTranslation ? 3 : 0);
      routePath     = routePath.length ? routePath : '/';

      return routes[lang][routePath];
    }
  }
};

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
  if (path === '/index') path = '/';
  if (typeof routes.client[path] === 'object' && routes.client[path][lang] !== undefined) {
    return {
      pathname: removeUrlLastSlash(routes.client[path][lang]),
      page: routes.client[path].page,
      restrict: config.server.enableRoutesRestriction
        ? getOrignalRoute(routes, path, lang).restrict
        : undefined,
    };
  }
  return {};

};