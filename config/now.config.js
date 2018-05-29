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
        return `${this.server.host}/fake-api`;
      },
    };
  },
};