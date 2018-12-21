const withSass                 = require('@zeit/next-sass');
const webpackConfig            = require('./config/webpack.config');
const withOffline = require('next-offline')
const workboxOpts = require('./config/serviceWorker.config');
module.exports = withOffline(withSass({
  cssModules: true,
  distDir: '../build',
  workboxOpts,
  generateInDevMode: true,
  //registerSwPrefix: '/static',
  //scope: '/',
  useFileSystemPublicRoutes: false,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]',
  },

  webpack: (config, { dev, isServer, defaultLoaders, buildId, config: { distDir } }) => {
    return webpackConfig(config, { isServer, buildId, distDir, dev });
  },
}));