const url        = require('url');
const urlJoin    = require('url-join');
const envBoolean = require('../helpers/envBoolean');


/**
 * API parameters
 */

module.exports = {

  // Hosting parameters

  get host() { return process.env.API_HOST; },
  get pathname() { return process.env.API_PATHNAME;},
  get port() { return process.env.API_PORT;},
  get protocol() { return process.env.API_PROTOCOL;},
  get enableFakeAPI() { return envBoolean(process.env.ENABLE_FAKE_API);},

  // Here you can define your api endpoints

  endpoints: {
    pages: '{{lang}}/pages',
    settings: '{{lang}}/settings',
  },

  // Define whether settings should be fetched from the API. If yes, a request will be made
  // using the 'settings' endpoint defined above. The result will
  // be stored in the redux store under state.app.settings. These settings are not cached and
  // will be requested on each server-side page load
  fetchAppSettings: true,

  // This method is used to generate an API URL for a given pathname
  get getUrl() {
    return (pathname = '') => {
      return url.format({
        hostname: this.host,
        protocol: this.protocol,
        port: this.port,
        pathname: urlJoin(this.pathname, pathname),
      });
    };
  },
};