import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';
import statusHttp from '../utils/statusHttp';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  async getAllHome(_req: Request, res: Response) {
    const { status, body } = await this.leaderBoardService.getAllHome();
    res.status(statusHttp[status]).json(body);
  }

  async getAllAway(_req: Request, res: Response) {
    const { status, body } = await this.leaderBoardService.getAllAway();
    res.status(statusHttp[status]).json(body);
  }
}
