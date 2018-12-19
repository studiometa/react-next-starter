const routes  = require('../server/routes');
const config  = require('../config');
const urlJoin = require('url-join');

module.exports = function (routeName, lang = config.lang.default) {
  if (!routes[routeName]) {
    return undefined;
  }

  const routeConfig = routes[routeName];

  if (config.lang.enabled && config.lang.available.find(e => e.lang === lang)) {
    if (typeof routeConfig.langRoutes === 'object' && routeConfig.langRoutes[lang] !== undefined) {
      if (config.lang.enableRouteTranslation) {
        return urlJoin('/', lang, routeConfig.langRoutes[lang]);
      } else {
        return urlJoin('/', routeConfig.langRoutes[lang]);
      }
    } else if (config.lang.enableRouteTranslation) {
      return urlJoin('/', lang, routeName);
    }
  }
  return routeName;
};