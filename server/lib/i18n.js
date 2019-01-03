const i18next            = require('i18next');
const XHR                = require('i18next-xhr-backend');
const LngDetector        = require('i18next-browser-languagedetector');
const config             = require('../../config/index');
const customLangDetector = require('./customI18nextLangDetector');

const lngDetector = new LngDetector();
lngDetector.addDetector(customLangDetector.path);
lngDetector.addDetector(customLangDetector.fallback);


const options = {
  fallbackLng: config.lang.default,
  load: 'languageOnly', // we only provide en, de -> no region specific locals like en-US, de-DE

  // have a common namespace used around the full app
  ns: [config.lang.defaultNamespace],
  defaultNS: config.lang.defaultNamespace,

  debug: process.env.NODE_ENV !== 'production' && config.lang.debug,

  // We do not want to save missing translations anywhere
  saveMissing: false,

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
    format: (value, format, lng) => {
      if (format === 'uppercase') return value.toUpperCase();
      return value;
    },
  },
  pluralSeparator: '__',
  contextSeparator: '__',
  detection: {
    // order and from where user language should be detected
    order: ['customPathDetector', 'cookie', 'customFallback'],

    // keys or params to lookup language from
    //  lookupQuerystring: 'lng',
    lookupCookie: config.lang.lookupCookie,
    lookupFromPathIndex: 0,

    // cache user language on
    caches: ['cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    cookieMinutes: config.lang.cookieMinutes,
    cookieDomain: config.server.host,
  },
};

const i18nInstance = i18next;

// for browser use xhr backend to load translations and browser lng detector
if (process.browser) {
  i18nInstance
    .use(XHR)
    // .use(Cache)
    .use(lngDetector);
}

// initialize if not already initialized
if (!i18nInstance.isInitialized) {
  i18nInstance.init(options);
}

// a simple helper to getInitialProps passed on loaded i18n data
const getInitialProps = (req, namespaces) => {
  if (!namespaces) namespaces = i18nInstance.options.defaultNS;
  if (typeof namespaces === 'string') namespaces = [namespaces];

  req.i18n.toJSON = () => null; // do not serialize i18next instance and send to client

  const initialI18nStore = {};
  req.i18n.languages.forEach((l) => {
    initialI18nStore[l] = {};
    namespaces.forEach((ns) => {
      initialI18nStore[l][ns] = (req.i18n.services.resourceStore.data[l] || {})[ns] || {};
    });
  });

  return {
    i18n: req.i18n, // use the instance on req - fixed language on request (avoid issues in race conditions with lngs of different users)
    initialI18nStore,
    initialLanguage: req.i18n.language,
  };
};

module.exports = {
  getInitialProps,
  i18nInstance,
  I18n: i18next.default,
};
