self.__precacheManifest = [
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/router.js"
  },
  {
    "url": "/_next/static/chunks/commons.f643062badde09274c68.js"
  },
  {
    "url": "/_next/static/runtime/main-06f9893ba7f4fc52765c.js"
  },
  {
    "url": "/_next/static/chunks/styles.3621f366cd158e0a9690.js"
  },
  {
    "url": "/_next/static/css/styles.1b708ff3.chunk.css"
  },
  {
    "url": "/_next/static/runtime/webpack-89179faa512dd01fbb62.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/troubleshooting.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/configuration.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/get-started.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/i18n.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/intro.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/performances.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/requirements.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/readme.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/store.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/theme.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/discover.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/under-the-hood.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/wrappers.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_error.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_sandbox.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/index.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/components.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_doc/api.js"
  },
  {
    "url": "/_next/static/Ww45VC9utVnqT50qrbaOC/pages/_app.js"
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
