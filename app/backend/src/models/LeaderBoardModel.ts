import getAllHomeQuery from '../database/queries/leaderBoardQueries';
import ILeaderBoard from '../Interfaces/LeaderBoard';
import ILeaderBoardModel from '../Interfaces/LeaderBoardModel';
import db from '../database/models';

export default class LeaderBoard implements ILeaderBoardModel {
  private model = db;
  async getAllHome(): Promise<ILeaderBoard[]> {
    const result = (await this.model.query(getAllHomeQuery)) as ILeaderBoard[];
    return result;
  }
}
