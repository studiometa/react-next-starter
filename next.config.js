const withSass      = require('@zeit/next-sass');
const webpackConfig = require('./config/webpack.config');


module.exports = withSass({
  cssModules: true,
  distDir: '../build',
  useFileSystemPublicRoutes: false,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]",
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    return webpackConfig(config);
  },

  // webpackDevMiddleware: config => {
  //   // Perform customizations to webpack dev middleware config
  //
  //   // Important: return the modified config
  //   return config
  // }
});