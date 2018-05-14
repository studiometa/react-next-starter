
const server = require('./server');

server.launch()
  .then(async res =>  {
    await server.close();
    return res;
  })
  .catch(err => {
    console.error('Server error', err.stack);
    process.exit(1);
  });