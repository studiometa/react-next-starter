/**
 * @jest-environment node
 */

const server = require('../server/server');
const fetch  = require('isomorphic-fetch');
const config = require('../config');
const i18n   = require('../lib/i18n');
const fs     = require('fs');
const path   = require('path');
const routes = require('../server/routes');
const assert = require('assert');
const resolvePathnameFromRouteName = require('../helpers/resolvePathnameFromRouteName')

beforeAll(async () => {
  return await server.start(process.env.PORT);
}, 100000);

afterAll(async (done) => {
  await server.stop();
  done();
  // return process.exit(0);
});

describe('Global app tests', () => {
  test('Check that all required files are defined', async () => {
    expect(server.checkRequiredFiles()).toBe(true);
  });

  test('Get a 200 when requesting the app', async () => {
    try {
      const res = await fetch(config.server.getUrl());
      expect(res.status).toBe(200);
    } catch (err) {
      console.error(err);
    }
  }, 400000);
});

describe('Translations tests', () => {

  test('Check that all translation namespaces files are defined for each language', () => {
    const ns = i18n.i18nInstance.options.ns;

    for (const { lang } of config.lang.available) {
      ns.forEach(namespace => {
        const nsPath = path.resolve(__dirname, `../locales/${lang}/${namespace}.json`);

        expect(fs.existsSync(nsPath)).toBe(true);
      });
    }
  }, 200000);
});

describe('Testing the fake-API', () => {
  if (config.api.enableFakeAPI !== true) return true;

  test('Get content from the API ', () => {
    return fetch(config.server.getUrl('/fake-api'))
      .then(res => res.json())
      .then(res => {
        expect(typeof res).toBe('object');
      });

  }, 100000);

  test('Get a 404 when content do not exists', () => {
    return fetch(config.server.getUrl('/fake-api/content-that-do-not-exists'))
      .catch(res => {
        expect(res.status).toBe(404);
      });
  }, 100000);
});

describe('Testing routes', () => {

  test('Check routes validity', () => {
    if (config.lang.enableRouteTranslation === true) {
      expect(server.areRoutesValid()).toBe(true);
    }
  });


  config.lang.available.forEach(({ lang }) => {
    if (config.lang.enableRouteTranslation !== true && lang !== config.lang.default) {
      return;
    }
    Object.values(routes).forEach(routeName => {
      const pathname = resolvePathnameFromRouteName(routeName, lang);
      if (pathname && pathname.length > 0) {
        test(`Check if the route ${routeName} returns a 200`, async () => {
          try {
            const res = await fetch(pathname);
            expect(res.status).toBe(200);
          } catch (err) {
            console.log(err);
            assert.fail();
          }
        }, 200000);
      }
    });
  });


  // Object.entries(routes).forEach(([route, t]) => {
  //   if (route && !route.includes(':')) {
  //     route = `${t.lang}${route}`;
  //     test(`Get a 200 response for static route '${route}'`, async () => {
  //       try {
  //         const res = await fetch(config.server.getUrl(route));
  //         expect(res.statusCode).toBe(200);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }, 400000);
  //   }
  // });
});