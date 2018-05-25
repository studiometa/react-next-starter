const config       = require('../config');
const url          = require('url');
const DEFAULT_PORT = config.server.port || '3000';
const HOST         = config.server.host || 'localhost';
const PROTOCOL     = config.server.protocol || 'http';


module.exports = (pathname = '', port = DEFAULT_PORT) => {

  // Handle Now environment
  if (process.env.NOW_URL) {
    return `${process.env.NOW_URL}:${port}`;
  }

  return url.format({
    hostname: HOST,
    protocol: PROTOCOL,
    port: process.env.PORT || port,
    pathname,
  });
};