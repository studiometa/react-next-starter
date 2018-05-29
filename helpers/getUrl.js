const config       = require('../config');
const url          = require('url');
const DEFAULT_PORT = config.server.port || '3000';
const HOST         = config.server.host || 'localhost';
const PROTOCOL     = config.server.protocol || 'http';


module.exports = (pathname = '', port = DEFAULT_PORT) => {

  if (process.env.BASE_URL) {
    return url.format({
      hostname: process.env.BASE_URL,
      protocol: PROTOCOL,
      pathname,
    });
  } else if (process.env.NOW_URL) {
    return url.format({
      hostname: process.env.NOW_URL,
      protocol: PROTOCOL,
      pathname,
    });
  } else {
    return url.format({
      hostname: HOST,
      protocol: PROTOCOL,
      port: process.env.PORT || port,
      pathname,
    });
  }
};