const url = require('url');

// The server config, mainly built from env variables
// If you wish to change an attribute defined in the env, please to it directly
// from your system or using a .env file !

module.exports = {
  port: parseInt(process.env.PORT),
  clientDir: './client',
  host: process.env.HOST,
  protocol: process.env.PROTOCOL,
  enableHtpasswd: (process.env.ENABLE_HTPASSWD === '1' || process.env.ENABLE_HTPASSWD === 'TRUE'),
  get getUrl() {
    return (pathname, withPort = true) => (
      url.format({
        hostname: this.host,
        protocol: this.protocol,
        port: withPort ? this.port : null,
        pathname,
      })
    );
  },
};