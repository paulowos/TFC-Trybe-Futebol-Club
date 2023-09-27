import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import statusHttp from '../utils/statusHttp';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async getAll(_req: Request, res: Response) {
    const { status, body } = await this.matchService.getAll();
    return res.status(statusHttp[status]).json(body);
  }
}
