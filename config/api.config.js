const url = require('url');
const urlJoin = require('url-join')

// Mainly used by the Socket class (utils/socket). This is all
// the settings about the API that stores the app data
module.exports = {
  host: process.env.API_HOST,
  pathname: process.env.API_PATHNAME,
  port: process.env.API_PORT,
  protocol: process.env.API_PROTOCOL,
  enableFakeAPI: (process.env.ENABLE_FAKE_API === '1' || process.env.ENABLE_FAKE_API === 'TRUE'),
  endpoints: {
   pages: '/pages',
    settings: '/settings'
  },
  apiKey: process.env.API_KEY,
  get getUrl() {
    return (pathname = '') => {
      return url.format({
        hostname: this.host,
        protocol: this.protocol,
        port: this.port,
        pathname: urlJoin(this.pathname, pathname),
      })
    };
  },
};