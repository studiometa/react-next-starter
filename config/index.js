const env = process.env.NODE_ENV;

const configs = {
  test: require('./test.config'),
  development: require('./development.config'),
  production: require('./production.config'),
  master: require('./master.config')
};

exports.production = configs.production;
exports.developement = configs.developement;
exports.test = configs.test;

module.exports = Object.assign({}, configs.master, configs[env]);