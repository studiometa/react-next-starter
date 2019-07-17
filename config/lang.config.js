const path = require('path');

/**
 * All the languages and i18n settings belong here. Most of the following parameters
 * are used by i18next
 */
module.exports = {

  // Enable all the translation services. If you disable it, it means no routes translation, no locales files,
  // and so on...
  enabled: false,
  enabled2: true,

  // The default language also used as a fallback
  default: 'en',

  // If defined to 'true', a route will look like '/en/products' instead of just '/products'
  //
  // IMPORTANT: Do not update this parameter in production, this will update all the
  // app routes and may have a lot of undesired effects on your SEO
  enableRouteTranslation: true,


  // This feature can only be used if routes translation has been enabled. This grants the server
  // to perform a 301 redirection when no language has been specified in the url. Note that this redirection
  // will only append if a resolving route is found, otherwise it will end with a 404 error.
  // ex: /produit can be resolved to /fr/produit
  enableFallbackRedirection: true,


  // All the languages that are available must be defined here
  // You can add some custom fields, like a path to a flag icon
  // !! Please keep the default language at the end of this array. At least one item is required.
  available: [
    {
      lang: 'fr',
      locale: 'fr_FR',
      name: 'Français',
    },
    {
      lang: 'en',
      locale: 'en_EN',
      name: 'English',
    },
  ],

  /**
   * All the following config is used by next-i18next
   * @see https://www.i18next.com/overview/configuration-options
   **/

  // Defines where and how the locales files are stored
  localesPath: '/locales',
  localesFormat: '{{lng}}/{{ns}}',

  // Defines if the language subpaths should be showed in the url
  // all: yes for all the locales, including the default one
  // foreign: yes for all the locales, except the default one
  localeSubpaths: 'all',

  // Enabling debug for i18next
  debug: false,

  // Lang namespaces
  namespaces: ['common', 'home'],

  // Default language namespace used on the whole app
  defaultNamespace: 'common',

  // The name of the cookie used to store the user language
  lookupCookie: 'lang',

  // The life of the cookie in minutes
  cookieMinutes: 120,
};
