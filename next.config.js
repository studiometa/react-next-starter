const withSass = require('@zeit/next-sass');


module.exports = withSass({
 cssModules: true,
  distDir: '..//build',
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]",
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    return config
  },

  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config

    // Important: return the modified config
    return config
  }
});