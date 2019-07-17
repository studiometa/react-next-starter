self.__precacheManifest = [
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_app.js",
    "revision": "4af0effdff0681316dc1"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/api.js",
    "revision": "c72b9caed281e04a3366"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/components.js",
    "revision": "b53a586646739e0483b6"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/configuration.js",
    "revision": "31294546fd7518986aa0"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/discover.js",
    "revision": "23f38aec0a5a5258085a"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/get-started.js",
    "revision": "72a747520130a7bde4e1"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/i18n.js",
    "revision": "b19bf5962fe4f154f0c3"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/intro.js",
    "revision": "20ca77136f8a5fd73989"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/performances.js",
    "revision": "93e9d8173bbb02853a21"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/requirements.js",
    "revision": "97237e32f2094a400d4d"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/router.js",
    "revision": "753c07f7dd89997dfab5"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/store.js",
    "revision": "a179f371bbd489720aa6"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/theme.js",
    "revision": "30fc1562d2c742f0947b"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/troubleshooting.js",
    "revision": "796de87623031cd31b86"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/under-the-hood.js",
    "revision": "ccfb0c67fadcf87fe6ec"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_doc/wrappers.js",
    "revision": "ccc8c6b06d50dbc6e0cf"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_error.js",
    "revision": "aa33e9eec429945cb470"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/_sandbox.js",
    "revision": "5699c06a9ecb4083e655"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/index.js",
    "revision": "3221ad957c47b5522430"
  },
  {
    "url": "/_next/static/MoXeukRGFG_JxFNdDA-RB/pages/readme.js",
    "revision": "e551c672218a778a314b"
  },
  {
    "url": "/_next/static/chunks/commons.d5ca0cbcd887f748cd6d.js",
    "revision": "e3158b7c54f5cbb00146"
  },
  {
    "url": "/_next/static/chunks/styles.d9bb53d18ed35ca8734f.js",
    "revision": "71bae9df86ecabfaf142"
  },
  {
    "url": "/_next/static/css/styles.f1610371.chunk.css",
    "revision": "71bae9df86ecabfaf142"
  },
  {
    "url": "/_next/static/runtime/main-f9ea5c62d4553ed0d812.js",
    "revision": "ad11f76ab9ec298def61"
  },
  {
    "url": "/_next/static/runtime/webpack-8ed9452df514b4d17d80.js",
    "revision": "c9d4f4ac318bec9c37e2"
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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(http[s]?:\/\/.*\.(?:png|jpg|jpeg|svg))/, new workbox.strategies.CacheFirst({ "cacheName":"images", plugins: [] }), 'GET');
workbox.routing.registerRoute(/\.(?:woff|woff2|otf|ttf)$/, new workbox.strategies.CacheFirst({ "cacheName":"fonts", plugins: [] }), 'GET');
workbox.routing.registerRoute(/\.(?:js|jsx)$/, new workbox.strategies.NetworkFirst({ "cacheName":"scripts", plugins: [] }), 'GET');
workbox.routing.registerRoute(/http[s]?:\/\/.*/, new workbox.strategies.NetworkFirst({ "cacheName":"html-cache", plugins: [] }), 'GET');
