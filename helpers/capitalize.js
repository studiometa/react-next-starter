module.exports = function (string = '', splitChar) {
  if (typeof splitChar === 'string') {
    return string
      .split(splitChar)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(splitChar);
  }
  return typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : '';
};