/**
 * This is an env config for Now deployments
 */
const url = require('url');

module.exports = {

  // Used by ExpressJs and NextJs to serve the app
  server : {
    port: 3000,
    clientDir: './client',
    host: process.env.BASE_URL || process.env.NOW_URL,
    protocol: 'https',
    enableFakeAPI: true,
    enableHtpasswd: true,
    get getUrl() {
      return (pathname, withPort = true) => (
        url.format({
          hostname: this.host,
          protocol: this.protocol,
          port: withPort ? (process.env.PORT || this.port) : null,
          pathname
        })
      );
    },
  },
};