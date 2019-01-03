const path = require('path');
module.exports = {
  setupFiles: ['./jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testRegex: "./*.test.js",
};