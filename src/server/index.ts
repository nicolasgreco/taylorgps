import * as express from 'express';
import * as compression from 'compression';
import { fourOFour } from './core/404/404-middleware';
import api from './api';
import app from './app';
import * as httpStatus from 'http-status';
import * as morgan from 'morgan';

const basePath = '';

const env = process.env.NODE_ENV;
const server: express.Application = express();

server.disable('x-powered-by');
// logs to console minimal information
// :method :url :statusCode :time :content length
if (env === 'development' || env === 'local') {
  server.use(morgan('dev'));
}

server.use(compression());

//Add healthcheck endpoint
server.get('/challenges/health', require('express-healthcheck')());

// api routes
server.use(basePath + '/api', api);

//app routes
if (env !== 'local') {
  // in production mode use app application
  server.use(basePath + '/', app);
}

server.use(fourOFour);

server.use((req: express.Request, res: express.Response) => {
  if (res.statusCode === httpStatus.NOT_FOUND) {
    res.json({
      message: httpStatus[httpStatus.NOT_FOUND],
    });
  }
});

export { server };
