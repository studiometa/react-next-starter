const withSass                 = require('@zeit/next-sass');
const webpackConfig            = require('./config/webpack.config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ANALYZE }              = process.env;

module.exports = withSass({
  cssModules: true,
  distDir: '../build',
  useFileSystemPublicRoutes: false,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]',
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    if (ANALYZE && process.env.NODE_ENV !== 'test') {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }

    return webpackConfig(config);
  },

  // webpackDevMiddleware: config => {
  //   // Perform customizations to webpack dev middleware config
  //
  //   // Important: return the modified config
  //   return config
  // }
});