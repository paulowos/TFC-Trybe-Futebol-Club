import { NextFunction, Request, Response } from 'express';
import statusHttp from '../utils/statusHttp';
import JWT from '../utils/JWT';

export default class AuthMiddleware {
  public static verifyHeader(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return res
        .status(statusHttp.UNAUTHORIZED)
        .json({ message: 'Token not found' });
    }

    const token = req.headers.authorization.split(' ')[1];
    req.headers.authorization = token;
    next();
  }

  public static validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization as string;
    try {
      const payload = JWT.validate(token);
      req.body.user = payload;
      return next();
    } catch (_e) {
      return res
        .status(statusHttp.UNAUTHORIZED)
        .json({ message: 'Token must be a valid token' });
    }
  }
}
