const express      = require('express');
const next         = require('next');
const config       = require('../config');
const serverRoutes = require('./server.routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: config.server.clientDir });

app.prepare()
  .then(() => {
    const server = express();

    //  Map over all the defined routes
    // and add a get handler to the server for
    // each of them
    serverRoutes.forEach(route => {
      server.get(route.path, (req, res) => (
        route.callback(req, res, app)
      ));
    });

    // Listen on the port defined in the config file
    server.listen(config.server.port, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:' + config.server.port);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });