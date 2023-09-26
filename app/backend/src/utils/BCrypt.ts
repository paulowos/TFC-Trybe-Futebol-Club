import * as bcrypt from 'bcryptjs';

export default class BCrypt {
  public static verifyPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
