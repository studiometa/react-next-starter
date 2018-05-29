/**
 * @jest-environment node
 */

const server = require('../server/server');
const fetch  = require('isomorphic-fetch');
const config = require('../config');

const TEST_PORT_INDEX = 0;
const PORT            = config.server.port + TEST_PORT_INDEX;


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
  });
});
