self.__precacheManifest = [
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/performances.js"
  },
  {
    "url": "/_next/static/chunks/commons.ff6a6a70ee904e4b6a15.js"
  },
  {
    "url": "/_next/static/runtime/main-d50df71d8928a10c1374.js"
  },
  {
    "url": "/_next/static/css/styles.73ecc666.chunk.css"
  },
  {
    "url": "/_next/static/chunks/styles.1e63b7cf090c373e9e9c.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_app.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/api.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/components.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/configuration.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/discover.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/get-started.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/i18n.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/intro.js"
  },
  {
    "url": "/_next/static/runtime/webpack-89179faa512dd01fbb62.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/requirements.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/router.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/store.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/theme.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/troubleshooting.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/under-the-hood.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_doc/wrappers.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_error.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/_sandbox.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/index.js"
  },
  {
    "url": "/_next/static/uT6LF17C77m2Nir9zdmZM/pages/readme.js"
  }
];

/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts(

);

workbox.skipWaiting();
workbox.clientsClaim();
workbox.setConfig({
  debug: true
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(http[s]?:\/\/.*\.(?:png|jpg|jpeg|svg))/, workbox.strategies.cacheFirst({ "cacheName":"images", plugins: [] }), 'GET');
workbox.routing.registerRoute(/\.(?:woff|woff2|otf|ttf)$/, workbox.strategies.cacheFirst({ "cacheName":"fonts", plugins: [] }), 'GET');
workbox.routing.registerRoute(/\.(?:js|jsx)$/, workbox.strategies.networkFirst({ "cacheName":"scripts", plugins: [] }), 'GET');
workbox.routing.registerRoute(/http[s]?:\/\/.*/, workbox.strategies.networkFirst({ "cacheName":"html-cache", plugins: [] }), 'GET');
