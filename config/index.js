const env          = process.env.NODE_ENV;
const serverConfig = require('./server.config');
let envConfig      = null;

try {
  envConfig = require(`./env/${env}.config`);
} catch (err) {
  envConfig = {};
}

// Build the final config object
const masteredConfig = () => {
  return Object.assign({
      server: serverConfig,
      api: require('./api.config'),
    },
    require('./master.config'),
    envConfig,
  );
};

module.exports = masteredConfig();