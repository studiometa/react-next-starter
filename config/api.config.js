const url     = require('url');
const urlJoin = require('url-join');

/**
 * Here you can manage the parameters of an hypothetical API
 */

module.exports = {

  // API hosting parameters

  get host() { return process.env.API_HOST; },
  get pathname() { return process.env.API_PATHNAME;},
  get port() { return process.env.API_PORT;},
  get protocol() { return process.env.API_PROTOCOL;},
  get enableFakeAPI() { return (process.env.ENABLE_FAKE_API === '1' || process.env.ENABLE_FAKE_API === 'TRUE');},

  // Here you can define your api endpoints

  endpoints: {
    pages: '{{lang}}/pages',
    settings: '{{lang}}/settings',
  },

  // Define if settings must be fetched from an API. If true, a request will be made
  // using the 'settings' endpoint defining in the api config file. The result will
  // be stored in the redux store under state.app.settings. The settings are not cached and
  // will be requested on the first page load on the server side (getInitialProps of _app)
  fetchAppSettings: true,

  // Like for the fetchAppSettings parameter, it is also possible to make a request to an API for
  // all the pages. The result will be accessible under the pages 'pageData' prop and stored in the redux
  // store under state.pages.<page_name>. Note that you can disable this feature for a single page by setting
  // 'withPageData' to false on the pageWrapper composer.
  // TODO This parameter is actually not in use
  fetchPagesData: true,

  // This method is used to generate an API URL for a given pathname
  get getUrl() {
    return (pathname = '') => {
      console.log(this.port, url.format({
        hostname: this.host,
        protocol: this.protocol,
        port: this.port,
        pathname: urlJoin(this.pathname, pathname),
      }));
      return url.format({
        hostname: this.host,
        protocol: this.protocol,
        port: this.port,
        pathname: urlJoin(this.pathname, pathname),
      });
    };
  },
};