const launchServer = require('../server/server');
const fetch = require('isomorphic-fetch')

beforeAll(async () => {
  return launchServer()
});

describe('Getting content from the API', () => {
  test('Getting content from the API', async () => {
  expect(1).toBe(2);

  });
});