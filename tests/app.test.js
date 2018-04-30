/**
 * @jest-environment node
 */

const server    = require('../server/server');
const fetch     = require('isomorphic-fetch');
const config    = require('../config');
const urlJoin   = require('url-join');
const getRoutes = require('../server/routes');
const url = require('url');

const routes = getRoutes();

const getUrl = pathname => url.format({
  hostname: config.server.host,
  protocol: config.server.protocol,
  port: config.server.port,
  pathname
});


beforeAll(async () => {
  return await server.launch()
});

afterAll(async () => {
  return await server.close()
});

describe('Testing routes', () => {

  test('Get a 200 response for all static routes', () => {
    let promises = Object.keys(routes).map(route => {
      if (!route.includes(':')) {
        return fetch(getUrl(route));
      }
    });

    const res = promise.all(promises)

    console.log(res);
  });
});
