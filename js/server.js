var config = require('config');
var https = require('https');
var fs = require('fs');
var app = require('./app');

const ssl_options = {
    key: fs.readFileSync('keys/privkey.pem'),
    cert: fs.readFileSync('keys/cert.pem'),
    ca: fs.readFileSync('keys/chain.pem')
  };
const server = https.createServer(ssl_options, app).listen(config.get('port'));

server.on('error', onError);
server.on('listening', onListening);

function onListening() {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('listening on ' + bind);
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

module.exports = server;
