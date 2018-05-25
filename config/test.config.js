const url = require('url');


module.exports = {

  // Used by ExpressJs and NextJs to serve the app
  server : {
    port: 8000,
    clientDir: './client',
    host: 'localhost',
    protocol: 'http',
    enableFakeAPI: true,
    get getUrl() {
      return () => (
        url.format({
          hostname: this.host,
          protocol: this.protocol,
          port: process.env.PORT || this.port,
        })
      );
    },
  },

  // Mainly used by the Socket class (utils/socket). This is all
  // the settings about the API that stores the app data
  get api() {
    return {
      getUrl: () => {
        return `${this.server.getUrl()}/fake-api`;
      },
    };
  },
};