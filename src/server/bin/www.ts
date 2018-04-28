#!/usr/bin/env node
/**
 * Module dependencies.
 */
import * as http from 'http';
import {server} from '../index';
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import config = require('../config');
//import logger from '../logger';

/**
 * Get port from environment and store in Express.
 */
const serverPort = 4201;
const port = normalizePort(process.env.PORT || serverPort);
server.set('port', port);

/**
 * Create HTTP server.
 */
const httpServer = http.createServer(server);
createConnection(config.get().db).then(async connection => {
  /**
   * Listen on provided port, on all network interfaces.
   */

  httpServer.listen(port);
  httpServer.on('error', onError);
  httpServer.on('listening', onListening);

}).catch(error => console.log(`TypeORM connection error: ${error}`));

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val): boolean | number {
  const normalizedPort = parseInt(val, 10);

  if (isNaN(normalizedPort)) {
    // named pipe
    return val;
  }

  if (normalizedPort >= 0) {
    // port number
    return normalizedPort;
  }

  return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      //logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      //logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */

function onListening() {
  const addr = httpServer.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  //logger.info('Listening on ' + bind + ' ' + process.env.NODE_ENV);
}
