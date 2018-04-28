import * as express from 'express';
import * as httpStatus from 'http-status';
import * as path from 'path';
import * as fs from 'fs';
import { fourOFour } from '../core/404/404-middleware';

const app: express.Application = express();

function getLocale(req) {
  //return req.get("locale");
  return 'es';
}

app.disable('x-powered-by');

app.use('/dist', express.static(path.join(__dirname, `../../dist/es`)));

app.use(['/', '/home', '/ranking', '/faq', '/terms-conditions'], (req, res) => {
  const locale = getLocale(req);
  const index = fs.createReadStream(
    path.join(__dirname, `../../dist/${locale}/index.html`),
  );
  index.pipe(res);
});

app.use(fourOFour);

app.use((req, res) => {
  if (res.statusCode === httpStatus.NOT_FOUND) {
    res.json({
      code: res.statusCode,
    });
  }
});

export default app;
