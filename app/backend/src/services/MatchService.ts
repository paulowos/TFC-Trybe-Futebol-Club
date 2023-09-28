import ServiceResponse from '../Interfaces/ServiceResponse';
import IMatchModel from '../Interfaces/MatchModel';
import MatchModel from '../models/MatchModel';
import IMatch, { CreationIMatch } from '../Interfaces/Match';

export default class MatchService {
  constructor(private matchModel: IMatchModel = new MatchModel()) {}

  async getAll(): Promise<ServiceResponse<IMatch[]>> {
    const body = await this.matchModel.getAll();
    return { status: 'OK', body };
  }

  async getAllByProgress(
    progress: boolean,
  ): Promise<ServiceResponse<IMatch[]>> {
    const body = await this.matchModel.getAllByProgress(progress);
    return { status: 'OK', body };
  }

  async finishMatch(id: number): Promise<ServiceResponse<void>> {
    await this.matchModel.finishMatch(id);
    return { status: 'OK', body: { message: 'Finished' } };
  }

  async updateGoals(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<void>> {
    await this.matchModel.updateGoals(id, homeTeamGoals, awayTeamGoals);
    return { status: 'OK', body: { message: 'Goals updated' } };
  }

  async create(data: CreationIMatch): Promise<ServiceResponse<IMatch>> {
    const body = await this.matchModel.create(data);
    return { status: 'CREATED', body };
  }
}
