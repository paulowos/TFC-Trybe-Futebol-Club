import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import statusHttp from '../utils/statusHttp';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    let serviceResponse;
    switch (inProgress) {
      case 'true':
        serviceResponse = await this.matchService.getAllByProgress(true);
        break;
      case 'false':
        serviceResponse = await this.matchService.getAllByProgress(false);
        break;
      default:
        serviceResponse = await this.matchService.getAll();
    }
    const { status, body } = serviceResponse;
    res.status(statusHttp[status]).json(body);
  }

  async finishMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { status, body } = await this.matchService.finishMatch(id);
    res.status(statusHttp[status]).json(body);
  }

  async updateGoals(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, body } = await this.matchService.updateGoals(
      id,
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(statusHttp[status]).json(body);
  }
}
