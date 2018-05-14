const config = require('../../config');


/**
 * Build the routes object from the languages defined in the config file
 * @returns {{}}
 */
module.exports = () => {
  let routes = {};
  config.lang.available.forEach(lang => {
    try {
      const langRoutes = require(`./${lang.lang}.routes.js`)();
      routes = Object.assign(routes, langRoutes)
    } catch(err) {
      console.error(`No route file found for lang ${ lang.lang }`, err.trace);
    }
  });
  return routes;
};

