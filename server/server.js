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
 * Listen to several routes. The routes can be
 * formatted differently depending on if a lang
 * is defined or not
 * @param routes
 * @param server
 * @param lang
 */
const listenToMulti = (routes, server, lang) => {
  Object.entries(routes).forEach(([path, route]) => {

    // Add the language segment to the url if defined
    const url = lang !== undefined ? `/${ lang }${ path }` : path;
    server.get(url, (req, res) => {
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
};

/**
 * Run the server
 * This method can only be called after the app has been
 * prepared
 * @param port
 * @returns {*|Function}
 */
const launchServer = (port) => {
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


  // Here we are adding new server listeners for the custom routes of the application. We are making this
  // differently depending on if the route translation has been enable or not
  if (config.lang.enableRouteTranslation === true) {
    Object.entries(routes).forEach(([lang, children]) => {
      if (typeof children === 'object') {
        listenToMulti(children, server, lang);
      }
    });
  } else {
    listenToMulti(routes.all, server);
  }


  // Fallback server entry for requests that do not match
  // any defined route
  server.get('*', (req, res) => {
    console.log('TWO', req.url);

    const LANG_PROVIDED_BY_CLIENT = false;

    // First we must check if a lang is defined in the client request. If yes and that route translation
    // has been enabled, we can try to resolve a matching route with the given lang. If no matching route
    // has been found, the action will fallback to the next condition.
    //
    // If no language has been defined in the request, we must try to find a route that matches the request.
    // If a route has been founded, we must make a redirection to add the language segment to the url.
    // For example, /products must probably be resolved with /en/products.
    // This feature can be disabled from the configuration file

    if (LANG_PROVIDED_BY_CLIENT) {
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
    } else if (config.lang.enableRouteTranslation === true && routes.all[req.url] !== undefined) {
      const matchingRoute = routes.all[req.url];

      res.redirect(301, `/${matchingRoute.lang}${req.url}`);
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
        .then(() => launchServer(port))
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