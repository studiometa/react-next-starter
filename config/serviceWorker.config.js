/**
 * Service Worker Configuration
 * @see https://github.com/drenther/next-pwa/blob/d3198b92bbb64bf2c4ada26d49bbccf85e98b32b/next.config.js
 * @see https://github.com/ragingwind/next-workbox-webpack-plugin
 * @see https://developers.google.com/web/tools/workbox/
 */
module.exports = ({buildId, distDir}) => ({
  buildId,
  clientsClaim: true,
  skipWaiting: true,
  globPatterns: ['build/static/*', 'build/static/commons/*'],
  modifyUrlPrefix: {
    'build': '/_next',
  },
  distDir,
  runtimeCaching: [
    {
      urlPattern: '/',
      handler: 'networkFirst',
      options: {
        cacheName: 'html-cache',
      },
    },
    {
      urlPattern: /(http[s]?:\/\/.*\.(?:png|jpg|jpeg|svg))/,
      handler: 'cacheFirst',
      options: {
        cacheName: 'images',
      },
    },
    {
      urlPattern: /\.(?:woff|woff2|otf|ttf)$/,
      handler: 'cacheFirst',
      options: {
        cacheName: 'fonts',
      },
    },
    {
      urlPattern: /\.(?:js|jsx)$/,
      handler: 'networkFirst',
      options: {
        cacheName: 'scripts',
      },
    },
  ],
});