/**
 * This is where your app routes are defined
 *
 * A route should look like that :
 * '/readme': { page: '/readme', langRoutes: { fr: '/lisez-moi', en: '/readme' }, prefetch: true, neverCache: false },
 *
 * - '/readme' : The route name. This name will never be visible directly on the app and will mainly be used to define links in the app
 * - 'page': This is the only required attribute. It is the path to the page component in the /client/pages folder
 * - 'langRoutes': If your app supports i18n, this allows you to define the look of your url endpoint depending on a given language.
 * Note that when i18n is disabled, the route name will be used in the URL. You can still use this attribute to override this behaviour
 * by defining the look of you're url for the app default language. (readme more about this in the _doc)
 * - 'prefetch' : This allows you to enable the NextJs prefetch feature on every link that point to this route
 * - 'neverCache' : By default when the cache is enabled, all the pages will be cached but you can still disable this feature for
 * some predefined routes using this parameter.
 *
 * Note that you can add as many other attributes as you need to the routes depending on your needs. Adversely to the v1 of this
 * starter, the routes are not computed anymore and will always be used as defined bellow. This allows you to import this file
 * anywhere you may need access to the routes.
 * The routes are also still accessible through the redux store under app.routes
 */

module.exports = {

  /** _DEV_ **/

  '/_sandbox': { page: '/_sandbox', langRoutes: { fr: '/_sandbox', en: '/_sandbox' } },


  /** GENERAL **/

  '/': { page: '/index', langRoutes: { fr: '/', en: '/' }, prefetch: true, neverCache: true },
  '/readme': { page: '/readme', langRoutes: { fr: '/lisez-moi', en: '/readme' } },
};