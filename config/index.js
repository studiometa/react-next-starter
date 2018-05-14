let env = process.env.NODE_ENV;

const configs = {
  test: require('./test.config'),
  development: require('./development.config'),
  production: require('./production.config'),
  master: require('./master.config'),
  now: require('./now.config')
};

exports.production = configs.production;
exports.developement = configs.developement;
exports.test = configs.test;
exports.now = configs.now;

// Tricky way of casting the now config when running the app
// on a Now (Zeit) deployment server
if (process.env.NOW_URL) {
  env = 'now';
}



module.exports = Object.assign({}, configs.master, configs[env]);