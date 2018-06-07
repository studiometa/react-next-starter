const config         = require('../../config');
const availableLangs = config.lang.available.map(e => e.lang);

module.exports = {
  path: {
    name: 'customPathDetector',

    lookup(options) {
      if (config.lang.enableRouteTranslation === true) {
        const url = typeof window !== 'undefined' ? window.location.pathname : options.url;
        const possibleUrlLang = url.slice(1, 3);
        return url[0] === '/' && url[3] === '/' && availableLangs.includes(possibleUrlLang)
          ? possibleUrlLang
          : undefined;
      } else return config.lang.default
    },
  },
  fallback: {
    name: 'customFallback',
    lookup(options) {
      return availableLangs.includes(options.language)
        ? options.language
        : config.lang.default;
    },
  },

};