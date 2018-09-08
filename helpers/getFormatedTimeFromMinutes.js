/**
 * Returns a string computed like that : 3h42
 * @param minutes
 * @returns {string}
 */
module.exports = (minutes = 0) => {
  return `${Math.floor(minutes / 60)}h${minutes % 60 === 0 ? '' : minutes % 60}`;
};