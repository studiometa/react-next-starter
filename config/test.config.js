module.exports = {

  // Used by ExpressJs and NextJs to serve the app
  server : {
    port: 3002,
    clientDir: './client',
    host: 'localhost',
    protocol: 'http',
    enableFakeAPI: true
  },

  // Mainly used by the Socket class (utils/socket). This is all
  // the settings about the API that stores the app data
  api: {
    url: 'http://localhost:3002/fake-api'
  }
};