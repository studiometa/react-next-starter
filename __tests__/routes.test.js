/**
 * @jest-environment node
 */

const server    = require('../server/server');
const fetch     = require('isomorphic-fetch');
const config    = require('../config');
const getRoutes = require('../server/routes');

const TEST_PORT_INDEX = 2;
const PORT            = config.server.port + TEST_PORT_INDEX;
const ROUTES          = getRoutes();

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

  test('Check that all the routes are well defined', async () => {
    if (config.lang.enableRouteTranslation === true) {
      Object.values(ROUTES[config.lang.default]).forEach(route => {
        config.lang.available.forEach(({ lang }) => {
          expect(ROUTES[lang]).not.toBe(undefined);
          expect(Object.values(ROUTES[lang]).filter(e => e.page === route.page).length).toBe(1);
        });
      });
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
    let promises = [];

    Object.keys(ROUTES.all).forEach(route => {
      if (route && !route.includes(':')) {
        promises.push(fetch(config.server.getUrl(route)));
      }
    });

    const res = await Promise.all(promises);

    expect(Array.isArray(res)).toBe(true);

    res.forEach(e => {
      expect(e.status).toBe(200);
    });

  }, 60000);
});
