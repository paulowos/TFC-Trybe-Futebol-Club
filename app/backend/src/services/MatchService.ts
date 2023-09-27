import ServiceResponse from '../Interfaces/ServiceResponse';
import IMatchModel from '../Interfaces/MatchModel';
import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/Match';

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
}
