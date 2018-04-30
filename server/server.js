const express = require('express');
const next = require('next');
const config = require('../config');
const getRoutes = require('./routes');
const FakeAPI = require('./fakeAPI');
const fakeAPIStore = require('./fakeAPI/fakeAPI.store');
const compression = require('compression');
const cors = require('cors');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: config.server.clientDir });
const routes = getRoutes();

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
    res.header("Access-Control-Allow-Origin",
      dev ? '*' : `${config.server.protocol}://${config.server.host}:${config.server.port}`);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
  Object.entries(routes).forEach(([path, route]) => {
    server.get(path, (req, res) => {
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
    return app.getRequestHandler()(req, res);
  });


  // Listen on the port defined in the config file
  server.listen(port, (err) => {
    if (err) throw err;
    if (process.env.NODE_ENV !== 'test') {
      console.log('> Ready on http://localhost:' + config.server.port);
    }
  });

  return server;
};


/**
 * Launch the app
 * @param port
 * @returns {Promise<any>}
 */
app.launch = (port = config.server.port) => (
  new Promise((resolve, reject) => {
    app.prepare()
      .then(() => app.launchServer(port))
      .then(res => {
        app.server = res;
        resolve(app)
      })
      .catch((err) => {
        reject(err)
      });
  })
);

module.exports = app;