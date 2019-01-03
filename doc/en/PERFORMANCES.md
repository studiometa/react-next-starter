# Performances

## Server caching

Even though NextJs natively manages part of the caching for page generation, it is possible to add an overlay to ExpressJs to cache all generated pages. This allows you to achieve much higher page loading performance.

The server cache is managed with the [LRUCache library](https://www.npmjs.com/package/lru-cache) and is configurable via environment variables:

- **ENABLE_SSR_CACHING** : [TRUE|FALSE] enable the server caching
- **SRR_CACHE_MAX_SIZE** : [1...∞] Size of the cache in Mb
- **SSR_CACHE_MAX_AGE** : [1...∞] Max age of the cache in seconds

**Here are some instructions to use this feature correctly: **

- Do not activate it in development
- Do not define a too long cache time, a few minutes are usually enough
- Please understand that ALL page generation logic that takes place on the server side will be cached, including possible calls to an API. This means that you can potentially lose the dynamism of some pages, so be careful!
- The cache id is generated according to the URL of the page, **with its possible parameters and queries**.
- It is possible to disable caching of some pages in the `routes.js` file (see router section of the doc)


## Service Worker

This feature allows you to manage the client-side cache.

All you have to do is to activate this feature with the env variable `ENABLE_SERVICE_WORKER`.

**Here are some instructions to use this feature correctly: **
- Do not activate it in development
- We use workbox under the hood to generate the configuration of the service-worker
- The configuration is located in the file `/config/serviceWorker.config.js`

**@see** https://github.com/hanford/next-offline
**@see** https://developers.google.com/web/tools/workbox/
**@see** https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#generatesw_plugin
   