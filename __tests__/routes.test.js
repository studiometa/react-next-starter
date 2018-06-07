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

  test('Check that all routes files are defined', () => {
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

  test('Check that all the routes are well defined', () => {
    if (config.lang.enableRouteTranslation === true) {
      Object.values(ROUTES[config.lang.default]).forEach(route => {
        config.lang.available.forEach(({ lang }) => {
          expect(ROUTES[lang]).not.toBe(undefined);
          expect(Object.values(ROUTES[lang]).filter(e => e.page === route.page).length).toBe(1);
        });
      });
    }
  });

  test('Check that there is no duplicated pages', () => {
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


  Object.entries(ROUTES.all).forEach(([route, t]) => {
    if (route && !route.includes(':')) {
      route = `${t.lang}${route}`;
      test(`Get a 200 response for static route '${route}'`, async () => {
        try {
          const res = await fetch(config.server.getUrl(route));
          expect(res.statusCode).toBe(200);
        } catch (err) {
          console.error(err);
        }
      }, 20000)
    }
  });
});
