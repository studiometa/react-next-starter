const paths = require('../server/lib/paths');

/**
 * Service Worker Configuration
 * @see https://github.com/hanford/next-offline
 * @see https://developers.google.com/web/tools/workbox/
 * @see https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#generatesw_plugin
 */
module.exports = {
  clientsClaim: true,
  skipWaiting: true,
  swDest: paths.appStatic + '/service-worker.js',
  runtimeCaching: [
    {
      urlPattern: /(http[s]?:\/\/.*\.(?:png|jpg|jpeg|svg))/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
      },
    },
    {
      urlPattern: /\.(?:woff|woff2|otf|ttf)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'fonts',
      },
    },
    {
      urlPattern: /\.(?:js|jsx)$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'scripts',
      },
    },
    {
      urlPattern: /http[s]?:\/\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'html-cache',
      },
    },
  ],
};