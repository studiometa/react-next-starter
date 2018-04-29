module.exports = {

  // Used by ExpressJs and NextJs to serve the app
  server : {
    port: 3001,
    clientDir: './client'
  },

  // Mainly used by the Socket class (utils/socket). This is all
  // the settings about the API that stores the app data
  api: {
    url: 'http://localhost:3001/fake-api'
  }
};