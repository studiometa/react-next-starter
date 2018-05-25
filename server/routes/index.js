const config = require('../../config');


/**
 * Add a 'client' attribute to the routes that contains all the
 * routes in a structure more easy to use on the client side with
 * the Link component. We are doing this to make it more easy to resolve
 * links on a cross languages platform by making all the operations a single time
 * here.
 *
 * For each route of the 'internalRoutesLang' routes set, an object like this will
 * be built:
 * "/products" : {
 *    "en": "/en/products",
 *    "fr: "/fr/produits"
 * }
 *
 * now when the route "/products" is required and a lang defined, all we have to do
 * is that: routes.client[<route>][<lang>]
 *
 * @returns {{}}
 */
const getClientRoutes = (routes) => {
  const { internalRoutesLang } = config.lang;
  let refRoutes                = null;
  let res                      = {};

  try {
    refRoutes = require(`./${ internalRoutesLang }.routes.js`)();
  } catch (err) {
    throw new Error(`The defined internalRoutesLang '${ internalRoutesLang }' do not match any route file`);
  }

  Object.entries(refRoutes).forEach(([key, route]) => {
    res[key] = {
      page: route.page,
      [internalRoutesLang]: `/${internalRoutesLang}${key}`,
    };
  });

  routes.client = res;
  return routes;
};


/**
 * Build the routes object from the languages defined in the config file
 * The operations done here can look complicated but we are doing a lot of things
 * here to make the routes more easy to use through the app. You will probably never
 * have to make any change here.
 * @returns {{}}
 */
const getRoutes = () => {
  let routes = {
    all: {},
  };

  // Get client routes structure
  if (config.lang.enableRouteTranslation === true) {
    routes = getClientRoutes(routes);
  }

  // Map over all the available languages
  config.lang.available.forEach(lang => {
    try {

      // Get a matching route file
      const matchingRoutes = require(`./${lang.lang}.routes.js`)();

      // Map over the routes of the language set
      Object.entries(matchingRoutes).forEach(([key, route]) => {

        // Store the lang on the route
        if (typeof route === 'object') {
          route.lang = lang.lang;
        }

        // Add the route to the routes client attribute so that we can easily retrieve it later
        if (config.lang.enableRouteTranslation === true && typeof routes.client === 'object' && lang !== config.lang.internalRoutesLang) {
          Object.entries(routes.client).forEach(([clientKey, clientRoute]) => {
            if (clientRoute.page === route.page) {
              routes.client[clientKey][lang.lang] = `/${lang.lang}${key}`;
            }
          });
        }
      });

      // Add the routes set to the main routes object
      routes[lang.lang] = matchingRoutes;

      // Store a reduced object containing all the routes. Routes with similar keys will be overwritten
      // but this is fine while this will only be used as a fallback for url resolution
      routes.all = Object.assign(routes.all, matchingRoutes);

    } catch (err) {
      throw new Error(`No route file found for lang ${ lang.lang }`);
    }
  });
  return routes;
};

const routes   = getRoutes();
module.exports = () => routes;
