const env     = process.env.NODE_ENV;
let envConfig = null;


try {
  envConfig = require(`./env/${env}.config`);
} catch (err) {
  envConfig = {};
}

// Build the final config object
const masteredConfig = Object.assign({
    server: require('./server.config'),
    api: require('./api.config'),
    lang: require('./lang.config'),
    seo: require('./seo.config'),
    redux: require('./redux.config'),
  },
  envConfig,
);

module.exports = masteredConfig;