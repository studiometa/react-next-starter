const url = require('url');

/**
 * The server config, mainly build from env variables
 * If you wish to change an attribute defined in the env, please to it directly
 * from your system or using a .env file !
 */

module.exports = {
  port: parseInt(process.env.PORT),
  clientDir: './client',
  host: process.env.HOST,
  protocol: process.env.PROTOCOL,
  enableHtpasswd: (process.env.ENABLE_HTPASSWD === '1' || process.env.ENABLE_HTPASSWD === 'TRUE'),

  // Define if the routes restriction feature should be enabled. Attention, this feature is not
  // magic and will need some extra-coding from your part. The only difference appends on the getMatchingLangRoute()
  // helper that will now return an extra attribute containing the current restrictions of the route. This
  // attribute will be available on the Link component as well if you need to perform changes depending on the route restriction
  // (hide private links for example). You will also probably need to add a new HOC to each page in order to check the
  // restrictions of a requested route and trigger a redirection or something like that.
  enableRoutesRestriction: false,

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