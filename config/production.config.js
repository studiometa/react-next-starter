const url = require('url');

module.exports = {

  // Used by ExpressJs and NextJs to serve the app
  server: {
    port: 3000,
    clientDir: './client',
    host: 'localhost',
    protocol: 'http',
    enableFakeAPI: true,
    get url () {
      return url.format({
        hostname: this.host,
        protocol: this.protocol,
        port: this.port,
      })
    }
  },

  // Mainly used by the Socket class (utils/socket). This is all
  // the settings about the API that stores the app data
  get api() {
    return {
      url: `${this.server.url}/fake-api`
    };
  },
};