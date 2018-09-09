const express                     = require('express');
const next                        = require('next');
const compression                 = require('compression');
const cors                        = require('cors');
const urlJoin                     = require('url-join');
const checkRequiredFiles          = require('react-dev-utils/checkRequiredFiles');
const paths                       = require('./lib/paths');
const customLangDetector          = require('./lib/customI18nextLangDetector');
const { choosePort, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser                 = require('react-dev-utils/openBrowser');
const auth                        = require('basic-auth');
const i18nextMiddleware           = require('i18next-express-middleware');
const Backend                     = require('i18next-node-fs-backend');
const germaine                    = require('germaine');
const config                      = require('../config');
const getRoutes                   = require('./routes');
const database                    = require('./database');
const { i18nInstance }            = require('../lib/i18n');
const path = require('path');


const DEFAULT_PORT = config.server.port || '3000';
const HOST         = config.server.host || 'localhost';
const dev          = process.env.NODE_ENV !== 'production';
const app          = next({ dev, dir: config.server.clientDir });
const routes       = getRoutes();


// Build the custom language detector

const lngDetector = new i18nextMiddleware.LanguageDetector();
lngDetector.addDetector(customLangDetector.path);
lngDetector.addDetector(customLangDetector.fallback);


// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
if (process.env === 'development') {
  process.on('unhandledRejection', err => {
    console.error('unhandled promise rejection error', err);
    return null;
  });
}

const htpasswdMiddleware = (request, response, next) => {
  if (config.server.enableHtpasswd === true) {
    let user = auth(request);

    if (!user || user.name !== process.env.HTPASSWD_USER || user.pass !== process.env.HTPASSWD_PASSWORD) {
      response.set('WWW-Authenticate', 'Basic realm="No access"');
      return response.status(401).send();
    }
  }
};

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

    // Remove the sandbox page in production
    if (path === '/_sandbox' && process.env.NODE_ENV === 'production') {
      return;
    }

    // Add the language segment to the url if defined
    const url = lang !== undefined ? `/${ lang }${ path }` : path;
    server.get(url, (req, res) => {
      const queryParams = {};

      // Add an htpasswd on the server if we are
      // running on the Now pre-production
      htpasswdMiddleware(req, res);

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
const launchServer = async (port) => {


  // Warn and crash if required files are missing

  if (process.env.NODE_ENV === 'development' && !checkRequiredFiles([
      paths.appServer,
      paths.appPublic,
      paths.appClient,
      paths.appClientPages,
      paths.appNodeModules,
      paths.appLocales,
      paths.appConfig,
    ])) {
    process.exit(1);
  }

  // Init i18next first

  await i18nInstance
    .use(Backend)
    .use(lngDetector)
    .init({
      fallbackLng: config.lang.default,
      preload: config.lang.available.map(e => e.lang),
      ns: config.lang.namespaces,
      defaultNS: config.lang.defaultNamespace,
      pluralSeparator: '__',
      contextSeparator: '__',
      backend: {
        loadPath: urlJoin(config.lang.localesPath, config.lang.localesFormat),
      },
      detection: {
        order: ['customPathDetector', 'cookie', 'customFallback'],
        lookupCookie: config.lang.lookupCookie,
        lookupFromPathIndex: 1,
        // optional expire and domain for set cookie
        cookieMinutes: config.lang.cookieMinutes,
        cookieDomain: config.server.host,
      },
    });

  // Prepare the app

  try {
    await app.prepare();
  } catch (err) {
    console.error(err);
  }

  const server = express();

  // Enable cors and compression on production mode

  if (dev === false) {
    server.use(cors());
    server.use(compression());
  } else {
  }

  // This will be used to open up the browser on development mode when the
  // server is ran
  const localUrlForBrowser = process.env.NODE_ENV === 'development'
    ? prepareUrls(config.server.protocol, HOST, port).localUrlForBrowser
    : null;

  // Enabling cors

  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin',
      dev ? '*' : config.server.getUrl());
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  // Initialize fake-API

  if (config.server.enableFakeAPI !== false) {
    server.get('/fake-api/*', germaine(path.resolve(__dirname, './database.json')));
  }


  // enable middleware for i18next

  server.use(i18nextMiddleware.handle(i18nInstance));

  // serve locales for client

  server.use('/locales', express.static(config.lang.localesPath));


  // Here we are adding new server listeners for the custom routes of the application. We are making this
  // differently depending on if the route translation has been enable or not

  if (config.lang.enableRouteTranslation === true) {
    Object.entries(routes).forEach(([lang, children]) => {
      if (typeof children === 'object') {
        listenToMulti(children, server, lang);
      }
    });
  } else {
    listenToMulti(routes[config.lang.default], server);
  }


  // Fallback server entry for requests that do not match
  // any defined route

  server.get('*', (req, res) => {

    const cleanUrl = req.url.split('?')[0];
    // Add an htpasswd on the server if we are
    // running on the Now pre-production

    htpasswdMiddleware(req, res);


    // First we must check if a lang is defined in the client request. If yes and that route translation
    // has been enabled, we can try to resolve a matching route with the given lang. If no matching route
    // has been found, the action will fallback to the next condition.
    //
    // If no language has been defined in the request, we must try to find a route that matches the request.
    // If a route has been founded, we must trigger a redirection to add the language segment to the url.
    // For example, /products must probably be resolved with /en/products.
    // Note that the we are always testing if the url contains '/_next/', this is an easy way to directly exclude
    // all assets and other resource files that may be asked to the server but do never need to get resolved with a
    // language. This is not necessary but it may increase the server speed by skipping more sophisticated conditions.

    if (!req.url.includes('/_next/')
      && !req.url.includes('/_sandbox')
      && config.lang.enableRouteTranslation === true
      && routes.all[cleanUrl] !== undefined) {

      const language      = config.lang.available.find(e => e.lang === req.language);
      const matchingRoute = typeof language === 'object'
      && typeof routes[language.lang] === 'object'
      && routes[language.lang][cleanUrl] !== undefined
        ? routes[language.lang][cleanUrl]
        : routes.all[cleanUrl];

      // Check if a matching route is defined and the redirection feature enabled
      if (typeof matchingRoute.lang === 'string' && config.lang.enableFallbackRedirection === true) {
        res.redirect(301, `/${matchingRoute.lang}${req.url}`);
      } else {
        return app.getRequestHandler()(req, res);
      }
    } else {
      return app.getRequestHandler()(req, res);
    }
  });

  // Listen on the port defined in the config file

  try {
    app.server = await server.listen(port);

    if (process.env.NODE_ENV !== 'test') {
      console.log('> Ready on ' + config.server.getUrl());
    }
    if (process.env.NODE_ENV === 'development') {
      openBrowser(localUrlForBrowser);
    }

  } catch (err) {
    throw err;
  }
  return app;

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

    // If we are not on a development environment, we do not want
    // to use a different port than the one defined in the configuration
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
      process.env.PORT = port;
      launchServer(port)
        .then(res => resolve(res))
        .catch((err) => {
          reject(err);
        });
    } else {
      choosePort(HOST, port)
        .then(port => {
          if (port !== null) {
            process.env.PORT = port;
            return launchServer(port);
          }
          return null;
        })
        .then(res => resolve(res))
        .catch((err) => {
          reject(err);
        });
    }
  })
);


/**
 * Stop the server properly
 * @returns {Promise<*|_.default>}
 */
app.stop = async () => {
  await app.server.close();
  await app.close();
  return app;
};


module.exports = app;