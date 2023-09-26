import * as jwt from 'jsonwebtoken';

export default class JWT {
  public static secret: string;
  constructor() {
    if (!process.env.JWT_SECRET) throw new Error('JWT Secret is required');
    JWT.secret = process.env.JWT_SECRET;
  }

  public static sign(payload: { id: number; role: string }): string {
    const token = jwt.sign(payload, JWT.secret);
    return token;
  }
}
