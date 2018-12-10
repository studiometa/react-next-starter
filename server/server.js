const express                     = require('express');
const next                        = require('next');
const compression                 = require('compression');
const cors                        = require('cors');
const urlJoin                     = require('url-join');
const { parse }                   = require('url');
const checkRequiredFiles          = require('react-dev-utils/checkRequiredFiles');
const paths                       = require('./lib/paths');
const customLangDetector          = require('./lib/customI18nextLangDetector');
const { choosePort, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser                 = require('react-dev-utils/openBrowser');
const auth                        = require('basic-auth');
const i18nextMiddleware           = require('i18next-express-middleware');
const Backend                     = require('i18next-node-fs-backend');
const path                        = require('path');
const LRUCache                    = require('lru-cache');
const { join }                    = require('path');

const config           = require('../config');
const getRoutes        = require('./routes');
const { i18nInstance } = require('../lib/i18n');
const germaine         = require('germaine');



class App {
  constructor(props) {
    this.config           = props.config;
    this.dev              = process.env.NODE_ENV !== 'production';
    this.nextApp          = next({ dev: this.dev, dir: this.config.server.clientDir });
    this.enableFakeApi    = (process.env.ENABLE_FAKE_API === '1' || process.env.ENABLE_FAKE_API === 'TRUE');
    this.enableHtpasswd   = (process.env.ENABLE_HTPASSWD === '1' || process.env.ENABLE_HTPASSWD === 'TRUE');
    this.protocol         = process.env.PROTOCOL || 'http';
    this.host          = process.env.HOST || this.config.server.baseUrl || 'localhost';
    this.port             = parseInt(process.env.PORT || this.config.server.port || 3000);
    this.routes           = getRoutes();
    this.url              = `${this.protocol}://${this.host}:${this.port}`;
    this.server           = null;
    this.enableSSRCaching = (process.env.ENABLE_SSR_CACHING === '1' || process.env.ENABLE_SSR_CACHING === 'TRUE');
    this.ssrCache         = new LRUCache({
      max: process.env.SRR_CACHE_MAX_SIZE ? parseInt(process.env.SRR_CACHE_MAX_SIZE) : 100,
      maxAge: process.env.SSR_CACHE_MAX_AGE ? parseInt(process.env.SSR_CACHE_MAX_AGE) : 1000 * 60 * 60, // 1hour
    });

    // Build the custom language detector

    this.lngDetector = new i18nextMiddleware.LanguageDetector();
    this.lngDetector.addDetector(customLangDetector.path);
    this.lngDetector.addDetector(customLangDetector.fallback);

  }


  /**
   * Launch the app
   *
   * Also check if the requested port is free and
   * ask the user for an other one if not.
   * @param port
   * @returns {Promise<any>}
   */
  async start(port = this.port) {

    // If we are not on a development environment, we do not want
    // to use a different port than the one defined in the configuration
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
      process.env.PORT = port + '';
      try {
        return this._launchServer(port);
      } catch (err) {
        throw err;
      }
    } else {
      try {
        const resolvedPort = await choosePort(this.host, port);

        if (resolvedPort !== null) {
          process.env.PORT = resolvedPort;
          return this._launchServer(resolvedPort);
        }
      } catch (err) {
        throw (err);
      }
    }
  }


  /**
   * Stop the server properly
   * @returns {Promise<*|_.default>}
   */
  async stop() {
    await this.nextApp.server.close();
    await this.nextApp.close();
    return this.nextApp;
  };


  /**
   * Run the server
   * This method can only be called after the app has been
   * prepared
   * @param port
   * @returns {*|Function}
   */
  async _launchServer(port = this.port) {

    this._checkRequiredFiles();

    try {
      await this._initI18nextInstance();
      await this.nextApp.prepare();
    } catch (err) {
      throw err;
    }

    // Init server
    this.server = express();

    // Enable cors and compression on production mode
    if (this.dev === false) {
      this.server.use(cors());
      this.server.use(compression());
    }

    // This will be used to open up the browser on development mode when the
    // server is ran
    const localUrlForBrowser = process.env.NODE_ENV === 'development'
      ? prepareUrls(this.protocol, this.host, port).localUrlForBrowser
      : null;

    // Enable cors on production
    this._enableCORS();

    // Initialize fake-API
    this._initFakeApi();

    // enable middleware for i18next
    this.server.use(i18nextMiddleware.handle(i18nInstance));

    // serve locales for client
    this.server.use('/locales', express.static(this.config.lang.localesPath));


    // Here we are adding new server listeners for the custom routes of the application. We are making this
    // differently depending on if the route translation has been enable or not
    this._initExpressListeners();


    // Listen on the port defined in the config file

    try {
      this.nextApp.server = await this.server.listen(port);

      if (process.env.NODE_ENV !== 'test') {
        console.log('> Ready on ' + `${this.protocol}://${this.host}:${port}`);
      }
      if (process.env.NODE_ENV === 'development') {
        openBrowser(localUrlForBrowser);
      }
    } catch (err) {
      throw err;
    }
    return this.nextApp;
  }


  /**
   * Warn and crash if required files are missing
   * @private
   */
  _checkRequiredFiles() {
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
  }


  /**
   * Init i18next first
   * @returns {Promise<void>}
   * @private
   */
  async _initI18nextInstance() {
    await i18nInstance
      .use(Backend)
      .use(this.lngDetector)
      .init({
        fallbackLng: this.config.lang.default,
        preload: this.config.lang.available.map(e => e.lang),
        ns: this.config.lang.namespaces,
        defaultNS: this.config.lang.defaultNamespace,
        pluralSeparator: '__',
        contextSeparator: '__',
        backend: {
          loadPath: urlJoin(this.config.lang.localesPath, this.config.lang.localesFormat),
        },
        detection: {
          order: ['customPathDetector', 'cookie', 'customFallback'],
          lookupCookie: this.config.lang.lookupCookie,
          lookupFromPathIndex: 1,
          // optional expire and domain for set cookie
          cookieMinutes: this.config.lang.cookieMinutes,
          cookieDomain: this.host,
        },
      });
  }


  /**
   * Enable CORS protection on production
   * @private
   */
  _enableCORS() {
    if (this.server !== null) {
      this.server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', this.dev ? '*' : this.url);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
      });
    }
  }


  /**
   * Initialize fake API
   * @private
   */
  _initFakeApi() {
    if (this.enableFakeApi !== false && this.server !== null) {
      this.server.get('/fake-api/*', germaine(path.resolve(__dirname, './database.json')));
    }
  }


  /**
   * Listen to several routes. The routes can be
   * formatted differently depending on if a lang
   * is defined or not
   * @param routes
   * @param server
   * @param lang
   */
  _listenToMulti(routes, server, lang) {
    Object.entries(routes).forEach(([path, route]) => {

      // Remove the sandbox page in production
      if (path === '/_sandbox' && process.env.NODE_ENV === 'production') {
        return;
      }

      // Check that the lang is valid and enabled
      if (lang && !this.config.lang.available.find(e => e.lang === lang)) {
        return;
      }

      // Add the language segment to the url if defined
      const url = lang !== undefined ? urlJoin('/', lang, path) : path;
      server.get(url, async (req, res) => {
          const cacheKey       = this._getCacheKey(req);
          const queryParams    = {};
          const shouldBeCached = (this.enableSSRCaching === true && route.neverCache !== true);
          // Add an htpasswd on the server if we are
          // running on the Now pre-production
          this._htpasswdMiddleware(req, res);

          // Add needed parameters to the response
          if (route.queryParams && route.queryParams.length > 0) {
            route.queryParams.forEach(param => {
              queryParams[param] = req.params[param];
            });
          }

          // If we have a page in the cache, let's serve it
          if (shouldBeCached && this.ssrCache.has(cacheKey)) {
            res.setHeader('x-cache', 'HIT');
            res.send(this.ssrCache.get(cacheKey));
            return;
          }

          try {
            // If not let's render the page into HTML
            const html = await this.nextApp.renderToHTML(req, res, route.page, queryParams);

            // Cache is disabled or something is wrong with the request, let's skip the cache
            if (!shouldBeCached || res.statusCode !== 200) {
              res.send(html);
              return;
            }

            // Let's cache this page
            this.ssrCache.set(cacheKey, html);

            res.setHeader('x-cache', 'MISS');
            res.send(html);
          } catch (err) {
            this.nextApp.renderError(err, req, res, route.page, queryParams);
          }
        },
      );
    });
  }


  /**
   * Initialize express routes listeners for each route defined in the
   * routing files
   * @private
   */
  _initExpressListeners() {
    if (this.config.lang.enableRouteTranslation === true) {
      Object.entries(this.routes).forEach(([lang, children]) => {
        if (typeof children === 'object') {
          this._listenToMulti(children, this.server, lang);
        }
      });
    } else {
      this._listenToMulti(this.routes[this.config.lang.default], this.server);
    }

    // Fallback server entry for requests that do not match
    // any defined route

    this.server.get('*', (req, res) => {

      const parsedUrl            = parse(req.url, true);
      const { pathname, search } = parsedUrl;

      // Add an htpasswd on the server if we are
      // running on the Now pre-production
      this._htpasswdMiddleware(req, res);

      // Serve the service-worker

      if (req.url.startsWith('/static/workbox/')) {
        this.nextApp.serveStatic(req, res, path.join(paths.appClient, req.url));

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

      } else if (!pathname.includes('/_next/')
        && !pathname.includes('/_sandbox')
        && this.config.lang.enableRouteTranslation === true
        && this.routes.all[pathname] !== undefined) {

        const language      = this.config.lang.available.find(e => e.lang === req.language);
        const matchingRoute = typeof language === 'object'
        && typeof this.routes[language.lang] === 'object'
        && this.routes[language.lang][pathname] !== undefined
          ? this.routes[language.lang][pathname]
          : this.routes.all[pathname];

        // Check if a matching route is defined and the redirection feature enabled
        if (typeof matchingRoute.lang === 'string' && this.config.lang.enableFallbackRedirection === true) {
          res.redirect(301, `/${matchingRoute.lang}${req.url}`);
        }
      } else {
        return this.nextApp.getRequestHandler()(req, res);
      }
    });
  }


  /**
   * Express middleware that adds an htpasswd form before serving anything from the server
   * @param request
   * @param response
   * @param next
   * @returns {*}
   * @private
   */
  _htpasswdMiddleware(request, response, next) {
    if (this.enableHtpasswd === true) {
      let user = auth(request);

      if (!user || user.name !== process.env.HTPASSWD_USER || user.pass !== process.env.HTPASSWD_PASSWORD) {
        response.set('WWW-Authenticate', 'Basic realm="No access"');
        return response.status(401).send();
      }
    }
  }


  /**
   * make sure to modify this to take into account anything that should trigger
   * an immediate page change (e.g a locale stored in req.session)
   * @param req
   * @returns {string}
   * @private
   */
  _getCacheKey(req) {
    return `${req.url}`;
  }

}



// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
if (process.env.NODE_ENV === 'development') {
  process.on('unhandledRejection', err => {
    console.error('unhandled promise rejection error', err);
    return null;
  });
}


module.exports = new App({
  config,
});