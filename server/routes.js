/**
 * This is where your app routes are defined
 *
 * A route should look like this :
 * '/readme': { page: '/readme', prefetch: true, neverCache: false },
 *
 * - '/readme' : The route name. This name will mainly be used to define links through the app
 * - 'page': This is the only required attribute. It is the path to the page component in the /client/pages folder
 * - 'prefetch' : This allows you to enable the NextJs prefetch feature on every link that point to this route
 * - 'neverCache' : By default when the cache is enabled, all the pages will be cached but you can still disable this feature for
 * some predefined routes using this parameter.
 *
 * Note that you can add as many other attributes as you need to the routes. Adversely to the v1 of this
 * starter, the routes are not computed pre-processed anymore and will always be used as defined bellow. This allows you to import this file
 * anywhere you may need access to them.
 * The routes are also still accessible through the redux store under app.routes
 */

module.exports = {

  /** _DEV_ **/

  '/_sandbox': { page: '/_sandbox', prefetch: true },

  '/_doc/intro': { page: '/_doc/intro' },
  '/_doc/requirements': { page: '/_doc/requirements' },
  '/_doc/get-started': { page: '/_doc/get-started' },
  '/_doc/discover': { page: '/_doc/discover' },
  '/_doc/under-the-hood': { page: '/_doc/under-the-hood' },
  '/_doc/configuration': { page: '/_doc/configuration' },
  '/_doc/router': { page: '/_doc/router' },
  '/_doc/api': { page: '/_doc/api' },
  '/_doc/i18n': { page: '/_doc/i18n' },
  '/_doc/wrappers': { page: '/_doc/wrappers' },
  '/_doc/store': { page: '/_doc/store' },
  '/_doc/theme': { page: '/_doc/theme' },
  '/_doc/components': { page: '/_doc/components' },
  '/_doc/performances': { page: '/_doc/performances' },
  '/_doc/troubleshooting': { page: '/_doc/troubleshooting' },


  /** GENERAL **/

  '/': { page: '/index', prefetch: true, neverCache: true },
  '/readme': { page: '/readme', prefetch: true },
};