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

  webpack: (config, { dev, isServer, defaultLoaders, buildId, config: { distDir } }) => {
    return webpackConfig(config, { isServer, buildId, distDir, dev });
  },
});