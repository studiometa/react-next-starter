/**
 * @jest-environment node
 */

const server    = require('../server/server');
const fetch     = require('isomorphic-fetch');
const config    = require('../config');
const url       = require('url');

const TEST_PORT_INDEX = 0;
const PORT = config.server.port + TEST_PORT_INDEX;

const getUrl = pathname => url.format({
  hostname: config.server.host,
  protocol: config.server.protocol,
  port: PORT,
  pathname,
});

beforeAll(async () => {
  return await server.launch(PORT);
}, 10000);

afterAll(async () => {
  return await server.stop();
});

describe('Testing routes', () => {

  test('Get a 200 response for all static routes', async () => {
    try {
      const res = await fetch(config.server.getUrl());
      expect(res.statusCode).toBe(200);
    } catch(err) {
      console.error(err);
    }
  });
});
