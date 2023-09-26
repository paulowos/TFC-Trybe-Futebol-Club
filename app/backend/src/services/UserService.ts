import ServiceResponse from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';
import IUser from '../Interfaces/User';

export default class UserService {
  constructor(private userModel = new UserModel()) {}

  async getByEmail(email: string): Promise<ServiceResponse<IUser>> {
    const body = await this.userModel.getByEmail(email);
    if (!body) return { status: 'NOT_FOUND', body: { message: 'User not found' } };

    return { status: 'OK', body };
  }
}
