const path = require('path');

module.exports = {
  lang: {

    // The default language also used as a fallback
    default: 'en',

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

    // All the languages that are available are defined here
    //
    // !! Please keep the default language at the end of this array. At least one item is required
    // Note that for urls, when no language is specified the app will try to make a fallback to another language
    // or to the default language instead. Fallbacks goes from the end of this array to the beginning.
    available: [
      {
        lang: 'fr',
        locale: 'fr_FR',
      },
      {
        lang: 'en',
        locale: 'en_EN',
      },
    ],

    // Defines where and how the locales files are stored
    localesPath : path.join(__dirname, '../locales'),
    localesFormat: '/{{lng}}/{{ns}}.json',

    // Enabling debug for i18next
    debug: false,

    namespaces: ['common', 'products'],
    defaultNamespace: 'common'
  }

};