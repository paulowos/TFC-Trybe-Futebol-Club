import * as jwt from 'jsonwebtoken';
import IPayload from '../Interfaces/Payload';

export default class JWT {
  public static secret: string = process.env.JWT_SECRET || 'jwt_secret';

  public static sign(payload: IPayload): string {
    const token = jwt.sign(payload, JWT.secret);
    return token;
  }

  public static validate(token: string): IPayload {
    const payload = jwt.verify(token, JWT.secret);
    return payload as IPayload;
  }
}
