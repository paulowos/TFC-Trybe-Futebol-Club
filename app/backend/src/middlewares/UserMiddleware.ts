import { NextFunction, Request, Response } from 'express';
import userSchema from '../schemas/user.schema';
import statusHttp from '../utils/statusHttp';

export default class UserMiddleware {
  public static login(req: Request, res: Response, next: NextFunction) {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      let status = statusHttp.BAD_REQUEST;
      let message = 'All fields must be filled';
      if (error.details[0].message.includes('Invalid')) {
        status = statusHttp.UNAUTHORIZED;
        message = 'Invalid email or password';
      }
      return res.status(status).json({ message });
    }
    req.body = value;
    next();
  }
}
