const url        = require('url');
const urlJoin    = require('url-join');
const envBoolean = require('../helpers/envBoolean');


/**
 * Contains the parameters of the API
 */

module.exports = {

  // API hosting parameters

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

  // Define if settings must be fetched from the API. If so, a request will be made
  // using the 'settings' endpoint defined above. The result will
  // be stored in the redux store under state.app.settings. These settings are not cached and
  // will be requested on the first page load on the server side (getInitialProps of _app)
  fetchAppSettings: true,

  // Like for the fetchAppSettings parameter, it is also possible to make a request to the API for
  // all the pages. The result will be accessible under the pages 'pageData' prop and stored in the redux
  // store under state.pages.<page_name>. Note that you can disable this feature for a single page by setting
  // 'withPageData' to false on the pageWrapper composer.
  // TODO This parameter is actually not in use
  fetchPagesData: true,

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