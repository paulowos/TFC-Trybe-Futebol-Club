import IUser from '../Interfaces/User';
import UserSequelizeModel from '../database/models/UserSequelizeModel';
import { IUserModel } from '../Interfaces/UserModel';

export default class UserModel implements IUserModel {
  private model = UserSequelizeModel;
  async getByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
