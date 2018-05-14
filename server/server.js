const express            = require('express');
const next               = require('next');
const config             = require('../config');
const getRoutes          = require('./routes');
const FakeAPI            = require('./fakeAPI');
const fakeAPIStore       = require('./fakeAPI/fakeAPI.store.js');
const compression        = require('compression');
const cors               = require('cors');
const clearConsole       = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
        choosePort,
        createCompiler,
        prepareProxy,
        prepareUrls,
      }                  = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser        = require('react-dev-utils/openBrowser');
const getUrl             = require('../helpers/getUrl');

const DEFAULT_PORT = config.server.port || '3000';
const HOST         = config.server.host || 'localhost';
const dev          = process.env.NODE_ENV !== 'production';
const app          = next({ dev, dir: config.server.clientDir });
const routes       = getRoutes();

/**
 * Run the server
 * This method can only be called after the app has been
 * prepared
 * @param port
 * @returns {*|Function}
 */
app.launchServer = (port) => {
  const server = express();

  if (dev === false) {
    server.use(cors());
    server.use(compression());
  } else {
  }

  // Enabling cors
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin',
      dev ? '*' : getUrl(null, port));
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  // Initialize fake-API
  if (config.server.enableFakeAPI !== false) {
    const fakeAPI = new FakeAPI(fakeAPIStore, { minDelay: 50, maxDelay: 100 });
    server.get('/fake-api', fakeAPI.find);
    server.get('/fake-api/*', fakeAPI.get);
  }

  //  Map over all the defined routes
  // and add a get handler to the server for
  // each of them

  /**
   * TODO
   * If 'enableRouteLangSegment' is not activated, it is possible that some routes will be duplicated. For example, in
   * english we may have a route like '/en/promotions' which would be '/fr/promotions' in french. But without the language
   * segment, we've got two identical routes.
   */
  console.log(routes);
  Object.entries(routes).forEach(([path, route]) => {
    // Add the language segment to the url if enabled in the config
    server.get(config.lang.enableRouteLangSegment === true && route.lang ? `/${route.lang}${path}` : path, (req, res) => {
      console.log('ONE', req.url);
      const queryParams = {};
      // Add needed parameters to the response
      if (route.queryParams && route.queryParams.length > 0) {
        route.queryParams.forEach(param => {
          queryParams[param] = req.params[param];
        });
      }

      return app.render(req, res, route.page, queryParams);
    });
  });


  // Default server entry
  server.get('*', (req, res) => {
    console.log('TWO', req.url);
    /**
     * TODO
     * We must handle the case where a language has been sent by the client (ex: cookies, etc)
     * In this case, it is probably better to resolve the url with the requested language instead of the
     * language of the route.
     *
     * Example:
     *
     * If the route '/produits' is requested along with a language cookie that required the 'en' language,
     * we can try to get a matching route for '/produits', then looking for the related page name and after all
     * trying to get a route that links to this page and with a lang attribute matching the requested language.
     * For example: ..., '/produits': { page: 'products', lang: 'fr' }, ...
     * Can be resolved with : ..., '/products': { page: 'products', lang: 'en' }, ...
     */

    // Try to find a route that matches the request. If a route has been founded, we must make a redirection in order
    // to add the language segment to the url. For example, /products must probably be resolved with /en/products.
    // If the matching route has not defined language, the request will fallback to the default language.
    // This feature can be disabled from the configuration file
    if (config.lang.enableRouteLangSegment === true && routes[req.url] !== undefined) {
      const matchingRoute = routes[req.url];

      // TODO, if there is not defined lang in the route, we cannot just use the default language as fallback, we must also translate the url
      res.redirect(301, matchingRoute.lang ? `/${matchingRoute.lang}${req.url}` : `/${config.lang.default}${req.url}`);
    } else {
      return app.getRequestHandler()(req, res);
    }
  });


  // Listen on the port defined in the config file
  server.listen(port, (err) => {
    if (err) throw err;
    if (process.env.NODE_ENV !== 'test') {
      console.log('> Ready on ' + getUrl());
    }
  });

  return server;
};


/**
 * Launch the app
 *
 * Also check if the requested port is free and
 * ask the user for an other one if not.
 * @param port
 * @returns {Promise<any>}
 */
app.launch = (port = DEFAULT_PORT) => (
  new Promise((resolve, reject) => {

    const start = (port) => {
      if (port == null) {
        reject('No available port has been founded.');
      }

      return app.prepare()
        .then(() => app.launchServer(port))
        .then(res => {
          app.server = res;
          resolve(app);
        })
        .catch((err) => {
          reject(err);
        });
    };

    // If we are not on a development environment, we do not want
    // to use a different port than the one defined in the configuration
    if (process.env.NODE_ENV === 'production') {
      start(port);
    } else {
      choosePort(HOST, port)
        .then(start(port))
        .catch((err) => {
          reject(err);
        });
    }
  })
);

module.exports = app;