import LeaderBoardModel from '../models/LeaderBoardModel';
import ILeaderBoardModel from '../Interfaces/LeaderBoardModel';
import ServiceResponse from '../Interfaces/ServiceResponse';
import ILeaderBoard from '../Interfaces/LeaderBoard';

export default class LeaderBoardService {
  constructor(
    private leaderBoardModel: ILeaderBoardModel = new LeaderBoardModel(),
  ) {}

  async getAllHome(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const body = await this.leaderBoardModel.getAllHome();
    return { status: 'OK', body };
  }

  async getAllAway(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const body = await this.leaderBoardModel.getAllAway();
    return { status: 'OK', body };
  }

  async getAllTotal(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const body = await this.leaderBoardModel.getAllTotal();
    return { status: 'OK', body };
  }
}
