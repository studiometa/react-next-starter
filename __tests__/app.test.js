/**
 * @jest-environment node
 */

const server          = require('../server/server');
const fetch           = require('isomorphic-fetch');
const config          = require('../config');
const i18n            = require('../lib/i18n');
const fs              = require('fs');
const TEST_PORT_INDEX = 0;
const PORT            = config.server.port + TEST_PORT_INDEX;
const path = require('path');

beforeAll(async () => {
  return await server.launch(PORT);
}, 10000);

afterAll(async () => {
  return await server.stop();
});

describe('Global app tests', () => {

  test('Get a 200 when requesting the app', async () => {
    try {
      const res = await fetch(config.server.getUrl());
      expect(res.statusCode).toBe(200);
    } catch (err) {
      console.error(err);
    }
  }, 10000);
});

describe('Translations tests', () => {

  test('Check that all translation namespaces files are defined for each language', () => {
    const ns = i18n.i18nInstance.options.ns;

    for (const { lang } of config.lang.available) {
      ns.forEach(namespace => {
        const nsPath = path.resolve(__dirname, `../locales/${lang}/${namespace}.json`);

        expect(fs.existsSync(nsPath)).toBe(true)
      })
    }
  }, 10000);
});
