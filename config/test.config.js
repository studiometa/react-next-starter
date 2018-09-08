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
      return (pathname = '') => (
        url.format({
          hostname: this.host,
          protocol: this.protocol,
          port: process.env.PORT || this.port,
          pathname
        })
      );
    },
  },
};