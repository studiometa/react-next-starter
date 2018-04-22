const devConfig = require('./development.config');
const prodConfig = require('./production.config');
const masterConfig = require('./master.config');

const env = process.env.NODE_ENV;

module.exports = env === 'production'
  ? Object.assign({}, masterConfig, prodConfig)
  : Object.assign({}, masterConfig, devConfig);