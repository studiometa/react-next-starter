/**
 * This is an env config for Now deployments
 */
const url = require('url');

module.exports = {

  // Used by ExpressJs and NextJs to serve the app
  server : {
    port: 3000,
    clientDir: './client',
    host: '0.0.0.0',
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
      url: `${process.env.NOW_URL}/fake-api`
    };
  },
};