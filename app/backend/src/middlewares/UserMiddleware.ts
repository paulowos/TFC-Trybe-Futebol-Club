import { NextFunction, Request, Response } from 'express';
import userSchema from '../schemas/user.schema';
import statusHttp from '../utils/statusHttp';

export default class UserMiddleware {
  public static login(req: Request, res: Response, next: NextFunction) {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res
        .status(statusHttp.BAD_REQUEST)
        .json({ message: 'All fields must be filled' });
    }
    req.body = value;
    next();
  }
}
