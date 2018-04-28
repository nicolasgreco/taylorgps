import * as httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';

export function dbConnection(req: Request, res: Response, next: NextFunction) {
  // Checks if headers are already sent
  if (res.headersSent) {
    return next();
  }
  res.status(httpStatus.NOT_FOUND);
  return next();
}
