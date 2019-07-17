const config      = require('../../config');
const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: config.lang.default,
  otherLanguages: config.lang.available
    .map(_lang => _lang.lang)
    .filter(_lang => _lang !== config.lang.default),
  localePath: config.lang.localesPath,
  defaultNS: config.lang.defaultNamespace,
  localeStructure: config.lang.localesFormat,
  localeSubpaths: config.lang.localeSubpaths,
  detection: {
    lookupCookie: config.lang.lookupCookie,
    cookieMinutes: config.lang.cookieMinutes,
  },
});
