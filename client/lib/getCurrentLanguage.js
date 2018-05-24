const config = require('../../config');

const availableLangs = config.lang.available.map(e => e.lang);

module.exports = () => {
  const possibleUrlLang = window.location.pathname.slice(1, 3);
  return availableLangs.includes(possibleUrlLang)
    ? possibleUrlLang
    : undefined;
};