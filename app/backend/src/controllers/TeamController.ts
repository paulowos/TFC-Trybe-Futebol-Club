import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import statusHttp from '../utils/statusHttp';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  async getAll(_req: Request, res: Response) {
    const { status, body } = await this.teamService.getAll();
    res.status(statusHttp[status]).json(body);
  }
}
