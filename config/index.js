let env = process.env.NODE_ENV;

const configs = {
  test: require('./test.config'),
  development: require('./development.config'),
  production: require('./production.config'),
  master: require('./master.config'),
  now: require('./now.config'),
};

configs.now  = Object.assign({}, configs.production, configs.now);
configs.test = Object.assign({}, configs.development, configs.test);

// Tricky way of casting the now config when running the app
// on a Now (Zeit) deployment server
// Note that process.env.NODE_ENV will still be 'production'
if (process.env.NOW_URL) {
  env = 'now';
}


module.exports = Object.assign({}, configs.master, configs[env]);