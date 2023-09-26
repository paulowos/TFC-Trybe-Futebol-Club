import * as jwt from 'jsonwebtoken';

export default class JWT {
  public static secret: string = process.env.JWT_SECRET || 'jwt_secret';

  public static sign(payload: { id: number; role: string }): string {
    const token = jwt.sign(payload, JWT.secret);
    return token;
  }
}
