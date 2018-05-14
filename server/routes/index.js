const config = require('../../config');


/**
 * Build the routes object from the languages defined in the config file
 * @returns {{}}
 */
module.exports = () => {
  let routes = {
    all: {}
  };

  config.lang.available.forEach(lang => {
    try {

      // Get a matching route file
      const matchingRoute = require(`./${lang.lang}.routes.js`)();

      // Store the lang on the route
      matchingRoute.lang = lang;

      routes[lang.lang] = matchingRoute;

      // Store a reduced object containing all the routes. Routes with similar keys will be overwritten
      // but this is fine while this will only be used as a fallback for url resolution
      routes.all = Object.assign(routes.all, matchingRoute);
    } catch (err) {
      console.error(`No route file found for lang ${ lang.lang }`, err.trace);
    }
  });
  return routes;
};

