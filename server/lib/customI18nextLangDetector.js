const config         = require('../../config');
const availableLangs = config.lang.available.map(e => e.lang);

module.exports = {
  path: {
    name: 'customPathDetector',

    lookup(options) {
      const possibleUrlLang = options.url.slice(1, 3);
      console.log(options.url, possibleUrlLang);
      return availableLangs.includes(possibleUrlLang)
        ? possibleUrlLang
        : undefined;
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