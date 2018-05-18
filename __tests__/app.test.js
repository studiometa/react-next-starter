/**
 * @jest-environment node
 */

const server    = require('../server/server');
const fetch     = require('isomorphic-fetch');
const config    = require('../config');
const urlJoin   = require('url-join');
const getRoutes = require('../server/routes');
const url       = require('url');

const routes = getRoutes();

const getUrl = pathname => url.format({
  hostname: config.server.host,
  protocol: config.server.protocol,
  port: config.server.port,
  pathname,
});

beforeAll(async () => {
  return await server.launch();
}, 10000);

afterAll(async () => {
  return await server.stop();
});

describe('Testing routes', () => {

  test('Get a 200 response for all static routes', async () => {
    let promises = Object.keys(routes.all).map(route => {
      if (!route.includes(':')) {
        return fetch(getUrl(route));
      }
    });
    const res    = await Promise.all(promises);

    expect(res).not.toBe(undefined);
  }, 10000);
});
