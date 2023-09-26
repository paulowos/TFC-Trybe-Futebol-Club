import { NextFunction, Request, Response } from 'express';
import statusHttp from '../utils/statusHttp';
import JWT from '../utils/JWT';
import UserService from '../services/UserService';

export default class AuthMiddleware {
  private static userService = new UserService();
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

  public static async validateToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const token = req.headers.authorization as string;
    try {
      const payload = JWT.validate(token);
      const user = await AuthMiddleware.userService.getById(payload.id);
      if (user.status !== 'OK') throw new Error();
      req.body.user = user.body;
      return next();
    } catch (_e) {
      return res
        .status(statusHttp.UNAUTHORIZED)
        .json({ message: 'Token must be a valid token' });
    }
  }
}
