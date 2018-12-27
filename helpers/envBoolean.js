/**
 * Check whether an environment variable is true or false
 * @param envVar
 * @returns {boolean}
 */
module.exports = function (envVar) {
  return ['1', 'true', 'TRUE'].includes(envVar);
};