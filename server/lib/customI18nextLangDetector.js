const config         = require('../../config');
const availableLangs = config.lang.available.map(e => e.lang);
const qs = require('qs');

// Here we are defining some custom language detectors for i18next. It is mainly
// a rewriting of some of the current detectors that was not always working as expected
// in that kind of project architecture.


function getCookie(cname) {
  let name          = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca            = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

module.exports = {
  path: {
    name: 'customPathDetector',

    lookup(options = {}) {
      if (config.lang.enableRouteTranslation === true) {
        const url             = typeof window !== 'undefined' ? window.location.pathname : options.url || '';
        const possibleUrlLang = url.slice(1, 3);

        return url[0] === '/' && (url[3] === '/' || url.length === 3) && availableLangs.includes(possibleUrlLang)
          ? possibleUrlLang
          : undefined;
      } else {
        const search = process.browser
          ? qs.parse((location.search || '').slice(1))
          : options.query;
        if (search && search.lang !== undefined && config.lang.available.find(e => e.lang === search.lang)) {
          return search.lang;
        }
      }
    },
  },

  clientCookie: {
    name: 'customClientCookie',
    lookup(options = {}) {
      if (!process.browser) return null;
      const cookieValue = getCookie(config.lang.lookupCookie);
      return cookieValue && cookieValue.length === 2 ? cookieValue : undefined;

    },
  },
  fallback: {
    name: 'customFallback',
    lookup(options = {}) {
      return availableLangs.includes(options.language)
        ? options.language
        : config.lang.default;
    },
  },

  get find() {
    return () => {
      return this.path.lookup() || this.clientCookie.lookup() || this.fallback.lookup();
    };
  },

};