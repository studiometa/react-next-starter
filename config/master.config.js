const path = require('path');

module.exports = {

  /*****************************************************
   * LANGUAGE SETTINGS
   *****************************************************/

  lang: {

    // The default language also used as a fallback
    default: 'fr',

    // If set on true, a route will look like '/en/products' instead of '/products'
    // if the lang segment is not defined, a 301 redirection will be done in order
    // to add it in the final url. Note that this redirection is handle with Express
    // and will only be triggered if a matching route has been resolved. (@see server.js).
    //
    // IMPORTANT: Do not update this parameter in production, this will update all the
    // app routes and have a lot of undesired effects on your SEO
    enableRouteTranslation: true,


    // This feature can only be used if routes translation has been enabled. This grant the server
    // to perform a 301 redirection when any language has been specified in the url. Note that this redirection
    // will only append if a resolving route is found, else it will end with a 404 error.
    enableFallbackRedirection: true,


    // When writing routes in this starter, you must always use the custom Link component. When using this component,
    // you must specify the route on which the link must be pointing, normal. But when route translation is enabled,
    // you must specify in which lang those routes will be written. For example, you may have a route named /products
    // and an other one called /produits, but you will only use one of those two names in your markup and links must be
    // automatically converted to the user language.
    //
    // TL;DR : This parameter define in which lang you want to write
    // routes when using the Link component to build links inside you app.
    internalRoutesLang: 'en',


    // All the languages that are available are defined here
    //
    // !! Please keep the default language at the end of this array. At least one item is required
    // Note that for urls, when no language is specified the app will try to make a fallback to another language
    // or to the default language instead. Fallbacks goes from the end of this array to the beginning.
    available: [
      {
        lang: 'en',
        locale: 'en_EN',
      },
      {
        lang: 'fr',
        locale: 'fr_FR',
      },
    ],

    /** All the following config is used by i18next **/

    // Defines where and how the locales files are stored
    localesPath : path.join(__dirname, '../locales'),
    localesFormat: '/{{lng}}/{{ns}}.json',

    // Enabling debug for i18next
    debug: false,

    // Lang namespaces
    namespaces: ['common', 'products'],

    // Default language namespace
    defaultNamespace: 'common',

    // The name of the cookie used to store the user language
    lookupCookie: 'lang',

    // The life of the cookie in minutes
    cookieMinutes: 120
  },

  /*****************************************************
   * SEO SETTINGS
   *****************************************************/

  seo: {

    // The default pages title that will be showed when no
    // related title has been found
    defaultPagesTitle: 'react-next-starter',

    // A list of default meta tags that will be used for the app
    defaultMetaTags: [
      { name: 'description', content: 'This is a wonderful starter for React and NextJs'},
      { name: 'author', content: 'Chuck Durst | Studio Meta'},
    ]
  }

};