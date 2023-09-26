import IUser from './User';

export interface IUserModel {
  getByEmail(email: string): Promise<IUser | null>;
}
