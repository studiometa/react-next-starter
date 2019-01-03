const url = require('url');

/**
 * The server config
 * You may need to change these settings from a '.env' file
 */

module.exports = {
  clientDir: './client',
  get port() { return parseInt(process.env.PORT);},
  get host() {return process.env.HOST; },
  get protocol() {return process.env.PROTOCOL;},
  get getUrl() {
    return (pathname, withPort = true) => {
      return url.format({
        hostname: this.host,
        protocol: this.protocol,
        port: withPort ? this.port : null,
        pathname,
      });
    };
  },
};