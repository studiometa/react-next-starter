/**
 * @jest-environment node
 */

const server    = require('../server/server');
const fetch     = require('isomorphic-fetch');
const config    = require('../config');
const urlJoin   = require('url-join');
const getRoutes = require('../server/routes');
const url       = require('url');


const TEST_PORT_INDEX = 2;
const PORT            = config.server.port + TEST_PORT_INDEX;
const ROUTES          = getRoutes();

const getUrl = pathname => url.format({
  hostname: config.server.host,
  protocol: config.server.protocol,
  port: config.server.port,
  pathname,
});

beforeAll(async () => {
  return await server.launch(PORT);
}, 10000);

afterAll(async () => {
  return await server.stop();
});

describe('Testing routes', () => {

  test('Check that all routes files are defined', async () => {
    if (config.lang.enableRouteTranslation === true) {
      config.lang.available.forEach(lang => {
        try {
          let res = require(`../server/routes/${lang.lang}.routes.js`)();

          expect(typeof res).toBe('object');
        } catch (err) {
          throw new Error(`No route file found for lang '${ lang.lang }'`);
        }
      });
    } else {
      try {
        let res = require(`./${config.lang.default}.routes.js`)();

        expect(typeof res).toBe('object');
      } catch (err) {
        throw new Error(`No route file found for lang '${ config.lang.default }'`);
      }
    }
  });

  test('Check that there is no duplicated pages', async () => {
    for (const [path, routesAttribute] of Object.entries(ROUTES)) {
      if ((config.lang.enableRouteTranslation === false && path === config.lang.default)
        || (config.lang.available.find(e => e.lang === path))) {
        const pages = [];
        for (const route of Object.values(routesAttribute)) {
          expect(pages).not.toContain(route.page);
          pages.push(route.page);
        }
      }
    }
  });

  test('Get a 200 response for all static routes', async () => {
    let promises = Object.keys(ROUTES.all).map(route => {
      if (!route.includes(':')) {
        return fetch(getUrl(route));
      }
    });
    for (const promise of promises) {
      let res = await promise;
      expect(res.status).toBe(200);
    }
    // const res = await Promise.all(promises);
    //
    // expect(res).not.toBe(undefined);
  }, 90000);
});
