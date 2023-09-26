import ServiceResponse from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';
// import IUser from '../Interfaces/User';
import IToken from '../Interfaces/Token';
import JWT from '../utils/JWT';
import BCrypt from '../utils/BCrypt';

const unauthorizedMessage = { message: 'Invalid email or password' };

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  // async getByEmail(email: string): Promise<ServiceResponse<IUser>> {
  //   const body = await this.userModel.getByEmail(email);
  //   if (!body) return { status: 'NOT_FOUND', body: { message: 'User not found' } };
  //   return { status: 'OK', body };
  // }

  async login(
    email: string,
    password: string,
  ): Promise<ServiceResponse<IToken>> {
    const user = await this.userModel.getByEmail(email);
    if (!user) {
      return { status: 'UNAUTHORIZED', body: unauthorizedMessage };
    }

    const isValid = BCrypt.verifyPassword(password, user.password);
    if (!isValid) {
      return { status: 'UNAUTHORIZED', body: unauthorizedMessage };
    }

    const payload = {
      id: user.id,
      role: user.role,
    };

    const token = JWT.sign(payload);
    return { status: 'OK', body: { token } };
  }
}
