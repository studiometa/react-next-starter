
const server = require('./server');

server.launch()
  .then(res => res)
  .catch(err => {
    console.error('Server error', err.stack);
    process.exit(1);
  });