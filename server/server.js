const express                      = require('express');
const next                         = require('next');
const compression                  = require('compression');
const cors                         = require('cors');
const urlJoin                      = require('url-join');
const { parse }                    = require('url');
const checkRequiredFiles           = require('react-dev-utils/checkRequiredFiles');
const paths                        = require('./lib/paths');
const customLangDetector           = require('./lib/customI18nextLangDetector');
const { choosePort }               = require('react-dev-utils/WebpackDevServerUtils');
const auth                         = require('basic-auth');
const i18nextMiddleware            = require('i18next-express-middleware');
const Backend                      = require('i18next-node-fs-backend');
const path                         = require('path');
const LRUCache                     = require('lru-cache');
const removeUrlLastSlash           = require('../helpers/removeUrlLastSlash');
const chalk                        = require('chalk');
const resolvePathnameFromRouteName = require('../helpers/resolvePathnameFromRouteName');
const envBoolean                   = require('../helpers/envBoolean');

const config           = require('../config');
const routes           = require('./routes');
const { i18nInstance } = require('./lib/i18n');
const germaine         = require('germaine');



class App {
  constructor(props) {
    this.config             = props.config;
    this.dev                = process.env.NODE_ENV !== 'production';
    this.nextApp            = next({ dev: this.dev, dir: this.config.server.clientDir });
    this.enableFakeApi      = envBoolean(process.env.ENABLE_FAKE_API);
    this.enableHtpasswd     = envBoolean(process.env.ENABLE_HTPASSWD);
    this.protocol           = process.env.PROTOCOL || 'http';
    this.host               = process.env.HOST || this.config.server.baseUrl || 'localhost';
    this.port               = parseInt(process.env.PORT || this.config.server.port || 3000);
    this.routes             = routes;
    this.url                = `${this.protocol}://${this.host}:${this.port}`;
    this.server             = null;
    this.enableSSRCaching   = envBoolean(process.env.ENABLE_SSR_CACHING);
    this.ssrCache           = new LRUCache({
      max: process.env.SRR_CACHE_MAX_SIZE ? parseInt(process.env.SRR_CACHE_MAX_SIZE) : 100,
      maxAge: process.env.SSR_CACHE_MAX_AGE ? parseInt(process.env.SSR_CACHE_MAX_AGE) : 1000 * 60 * 60, // 1hour
    });
    this._routesCheckUnique = [];

    // Build the custom language detector

    this.lngDetector = new i18nextMiddleware.LanguageDetector();
    this.lngDetector.addDetector(customLangDetector.path);
    this.lngDetector.addDetector(customLangDetector.fallback);

  }


  /**
   * Launch the app
   *
   * Also checks if the requested port is free, otherwise
   * ask the user to use another one.
   * @param port
   * @returns {Promise<any>}
   */
  async start(port = this.port) {

    // If we are not on a development environment, we do not want
    // to use a different port than the one defined in the configuration
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
      process.env.PORT = port + '';
      try {
        return await this._launchServer(port);
      } catch (err) {
        throw err;
      }
    } else {
      try {
        const resolvedPort = await choosePort(this.host, port);

        if (resolvedPort !== null) {
          process.env.PORT = resolvedPort;
          return await this._launchServer(resolvedPort);
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
   * Return true if all the routes pass the validity check
   * @returns {boolean}
   */
  areRoutesValid() {
    try {
      this._routesCheckUnique = [];
      Object.entries(this.routes).forEach(([routeName, routeConfig]) => {
        this._checkRouteConfigValidity(routeConfig, routeName);
      });
      this._routesCheckUnique = [];
      return true;
    } catch (err) {
      return false;
    }
  }


  /**
   * Run the server
   * This method can only be called after the app has been prepared
   * @param port
   * @returns {*|Function}
   */
  async _launchServer(port = this.port) {

    this.checkRequiredFiles();

    try {
      if (this.config.lang.enabled) {
        await this._initI18nextInstance();
      }
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

    if (envBoolean(process.env.FORCE_SSL)) {
      this.server.use(this._forceSSLMiddleware);
    }

    // Enable cors on production
    this._enableCORS();

    // Initialize fake-API
    this._initFakeApi();

    // Listen to the public folder
    this.server.use('/', express.static(paths.appPublic));

    if (this.config.lang.enabled) {

      // enable middleware for i18next
      this.server.use(i18nextMiddleware.handle(i18nInstance));

      // serve locales for client
      this.server.use('/locales', express.static(this.config.lang.localesPath));
    }


    // Here we are adding new server listeners for the custom routes of the application. We are making this
    // differently depending on if the route translation has been enable or not
    this._initMainListeners();

    // Fallback server entry for requests that do not match any defined route
    this._initFallbackListener();

    try {
      this.nextApp.server = await this.server.listen(port);

      if (process.env.NODE_ENV !== 'test') {
        console.log('> Ready on ' + `${this.protocol}://${this.host}:${port}`);
      }
    } catch (err) {
      throw err;
    }
    return this.nextApp;
  }


  /**
   * Warn and crash if required files are missing
   * On test env, it should only return false if a path is missing
   */
  checkRequiredFiles() {
    if (!checkRequiredFiles([
      paths.appServer,
      paths.appPublic,
      paths.appClient,
      paths.appClientPages,
      paths.appNodeModules,
      paths.appLocales,
      paths.appConfig,
    ])) {
      if (process.env.NODE_ENV === 'test') return false;
      process.exit(1);
    }
    return true;
  }


  /**
   * Init i18next first
   * @returns {Promise<void>}
   * @private
   */
  async _initI18nextInstance() {
    if (!this.config.lang.enabled) return;

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
      this.server.get('/fake-api', germaine(path.resolve(__dirname, './database.json')));
      this.server.get('/fake-api/*', germaine(path.resolve(__dirname, './database.json')));
    }
  }


  /**
   * push a listener for a given route
   * @param routePath
   * @param routeConfig
   * @param routeName
   */
  _pushRouteListener(routePath, routeConfig, routeName) {

    // Remove the sandbox page in production
    if (process.env.NODE_ENV === 'production'
      && !envBoolean(process.env.KEEP_DEV_TOOLS_ON_PRODUCTION)
      && (routeName.indexOf('/_sandbox') === 0 || routeName.indexOf('/_doc') === 0)) {
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(chalk.cyan('>', routePath));
    }

    this.server.get(routePath, async (req, res) => {
        const cacheKey       = this._getCacheKey(req);
        const queryParams    = {};
        const shouldBeCached = (this.enableSSRCaching === true && routeConfig.neverCache !== true);

        if (req.url && req.url.length > 1 && req.url.substr(req.url.length - 1) === '/') {
          res.redirect(301, removeUrlLastSlash(req.url));
        }

        this._htpasswdMiddleware(req, res);

        // Add needed parameters to the response
        routePath.split('/').forEach(routeSeg => {
          if (routeSeg.indexOf(':') === 0) {
            const param        = routeSeg.slice(1);
            queryParams[param] = req.params[param];
          }
        });

        // If we have a page in the cache, let's serve it
        if (shouldBeCached && this.ssrCache.has(cacheKey)) {
          res.setHeader('x-cache', 'HIT');
          res.send(this.ssrCache.get(cacheKey));
          return;
        }

        try {
          const html = await this.nextApp.renderToHTML(req, res, routeConfig.page, queryParams);

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
          this.nextApp.renderError(err, req, res, routeConfig.page, queryParams);
        }
      },
    );
  }


  /**
   * Initialize express routes listeners for each route defined in the
   * routing files
   * @private
   */
  _initMainListeners() {
    if (process.env.NODE_ENV !== 'production') {
      console.log(chalk.cyan.bold('\nExpress is now listening to the following routes :'));
    }

    if (this.config.lang.enabled) {
      this.config.lang.available.forEach(({ lang }) => {
        if (this.config.lang.enableRouteTranslation !== true && lang !== this.config.lang.default) {
          return;
        }
        Object.entries(this.routes).forEach(([routeName, routeConfig]) => {
          const pathname = resolvePathnameFromRouteName(routeName, lang);
          if (pathname && pathname.length > 0) {
            this._pushRouteListener(removeUrlLastSlash(pathname), routeConfig, routeName);
          }
        });
      });
    } else {
      Object.entries(this.routes).forEach(([routeName, routeConfig]) => {
        this._pushRouteListener(removeUrlLastSlash(routeName), routeConfig, routeName);
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('\n');
    }
  }


  /**
   * Listen to any not-handled requests
   * @private
   */
  _initFallbackListener() {

    this.server.get('*', (req, res) => {

      const parsedUrl = parse(req.url, true);
      const pathname  = removeUrlLastSlash(parsedUrl.pathname);

      this._htpasswdMiddleware(req, res);

      // Serve the service-worker

      if (req.url === '/service-worker.js') {
        this.nextApp.serveStatic(req, res, paths.appStatic + req.url);

        // If no language has been defined in the request, we should try to find a route that matches the request.
        // If a route has been founded, we must trigger a redirection to add the language segment to the url.
        // For example, /products should probably be resolved to /en/products.

      } else if (
        this.config.lang.enabled
        && !pathname.includes('/_next/')
        && !pathname.includes('/static')
        && this.config.lang.enableRouteTranslation === true
        && this.config.lang.enableFallbackRedirection === true) {
        let language     = this.config.lang.available.find(e => e.lang === req.language);
        let matchingLang = undefined;

        // If a lang is defined from another provider like cookies, it should be easy to resolve the right route
        if (language) {
          Object.values(this.routes).forEach(e => {
            if (e.langRoutes && e.langRoutes[language.lang] === pathname) {
              return matchingLang = language.lang;
            }
          });
        }

        // Else, we must loop over every langRoute of every route and look for a match
        if (!matchingLang) {
          Object.values(this.routes).forEach(e => {
            if (e.langRoutes) {
              return Object.entries(e.langRoutes).forEach(([_lang, _lroute]) => {
                if (_lroute === pathname) {
                  matchingLang = _lang;
                }
              });
            }
          });
        }

        // Finally if a lang has been found, we can resolve the url, else we should let the next App trigger a
        // 404 error
        if (matchingLang) {
          res.redirect(301, urlJoin('/', matchingLang, pathname));
        } else {
          return this.nextApp.getRequestHandler()(req, res);
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


  /**
   * Check the validity of a given 'routeConfig' object
   * @param routeConfig
   * @param routeName
   * @private
   */
  _checkRouteConfigValidity(routeConfig, routeName) {
    if (typeof routeConfig !== 'object') {
      throw new Error(`Route error : the route "${routeName}" should be and object, ${typeof routeConfig} given.`);
    }
    if (typeof routeConfig.page !== 'string' || routeConfig.page.length < 1) {
      throw new Error(`Route error : the route "${routeName}" should have a valid 'page' attribute but none was given.`);
    }
    if (this.config.lang.enabled && typeof routeConfig.langRoutes === 'object') {
      let routesToPush = [];
      Object.values(routeConfig.langRoutes).forEach(lr => {
        if (this._routesCheckUnique.includes(lr)) {
          throw new Error(`Route error : the route "${routeName}" have a langRoute '${lr}' that is already used on an other route.`);
        }
        routesToPush.push(lr);
      });
      this._routesCheckUnique = [...this._routesCheckUnique, ...routesToPush];
    } else {
      if (this._routesCheckUnique.includes(routeName)) {
        throw new Error(`Route error : the route "${routeName}" is already defined.`);
      }
      this._routesCheckUnique.push(routeName);
    }
  }


  /**
   * This express middleware can be used to ensure the use of HTTPS for any request
   * @param req
   * @param res
   * @param next
   * @returns {void|*|Response}
   * @private
   */
  _forceSSLMiddleware(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== 'development') {
      return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  }
}



// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
if (process.env.NODE_ENV === 'development') {
  process.on('unhandledRejection', err => {
    console.error(chalk.red('unhandled promise rejection error', err));
    return null;
  });
}


module.exports = new App({
  config,
});