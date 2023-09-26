import { Request, Response } from 'express';
import UserService from '../services/UserService';
import statusHttp from '../utils/statusHttp';

export default class UserController {
  constructor(private userService = new UserService()) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, body } = await this.userService.login(email, password);
    res.status(statusHttp[status]).json(body);
  }

  static async getRole(req: Request, res: Response) {
    const { role } = req.body.user;
    res.status(statusHttp.OK).json({ role });
  }
}
