const paths = require('../server/lib/paths');
const path  = require('path');

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
  globPatterns: ['build/static/*', 'build/static/commons/*'],
  modifyUrlPrefix: {
    'build': '/_next',
  },
  runtimeCaching: [
    // {
    //   urlPattern: /(http[s]?:\/\/.*\.(?:png|jpg|jpeg|svg))/,
    //   handler: 'cacheFirst',
    //   options: {
    //     cacheName: 'images',
    //   },
    // },
    // {
    //   urlPattern: /\.(?:woff|woff2|otf|ttf)$/,
    //   handler: 'cacheFirst',
    //   options: {
    //     cacheName: 'fonts',
    //   },
    // },
    // {
    //   urlPattern: /\.(?:js|jsx)$/,
    //   handler: 'networkFirst',
    //   options: {
    //     cacheName: 'scripts',
    //   },
    // },
    {
      urlPattern: /http[s]?:\/\/.*/,
      handler: 'networkFirst',
      options: {
        cacheName: 'html-cache',
      },
    },
  ],
};