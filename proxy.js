const httpProxy = require('http-proxy');
const fs        = require('fs');

//
// Create the HTTPS proxy server in front of a HTTP server
//
httpProxy.createServer({
  target: {
    host: 'localhost',
    port: 3000,
  },
  ssl: {
    key: fs.readFileSync('./localhost.key', 'utf8'),
    cert: fs.readFileSync('./localhost.crt', 'utf8'),
  },
}).listen(8009);
