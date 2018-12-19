const path = require('path');

/**
 * All the languages and internationalization settings belong here. Most of the following parameters
 * are used by i18next
 */
module.exports = {

  // The default language also used as a fallback
  default: 'fr',

  // If set on true, a route will look like '/en/products' instead of '/products'
  //
  // IMPORTANT: Do not update this parameter in production, this will update all the
  // app routes and have a lot of undesired effects on your SEO
  enableRouteTranslation: false,


  // This feature can only be used if routes translation has been enabled. This grants the server
  // to perform a 301 redirection when no language has been specified in the url. Note that this redirection
  // will only append if a resolving route is found, else it will end with a 404 error.
  // ex: /produit can be resolved to /fr/produit
  enableFallbackRedirection: true,


  // All the languages that are available must be defined here
  //
  // !! Please keep the default language at the end of this array. At least one item is required.
  // Note that for urls, when no language is specified the app will try to make a fallback to another language
  available: [
    {
      lang: 'en',
      locale: 'en_EN',
      name: 'English',
    },
    {
      lang: 'fr',
      locale: 'fr_FR',
      name: 'Français',
    },
  ],

  /** All the following config is used by i18next **/

  // Defines where and how the locales files are stored
  localesPath: path.join(__dirname, '../locales'),
  localesFormat: '/{{lng}}/{{ns}}.json',

  // Enabling debug for i18next
  debug: false,

  // Lang namespaces
  namespaces: ['common', 'home'],

  // Default language namespace
  defaultNamespace: 'common',

  // The name of the cookie used to store the user language
  lookupCookie: 'lang',

  // The life of the cookie in minutes
  cookieMinutes: 120,
};
