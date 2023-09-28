import {
  getAllAwayQuery,
  getAllHomeQuery,
  getAllTotalQuery,
} from '../database/queries/leaderBoardQueries';
import ILeaderBoard from '../Interfaces/LeaderBoard';
import ILeaderBoardModel from '../Interfaces/LeaderBoardModel';
import db from '../database/models';

export default class LeaderBoardModel implements ILeaderBoardModel {
  private model = db;
  async getAllHome(): Promise<ILeaderBoard[]> {
    const [result] = (await this.model.query(
      getAllHomeQuery,
    )) as ILeaderBoard[][];
    return result;
  }

  async getAllAway(): Promise<ILeaderBoard[]> {
    const [result] = (await this.model.query(
      getAllAwayQuery,
    )) as ILeaderBoard[][];
    return result;
  }

  async getAllTotal(): Promise<ILeaderBoard[]> {
    const [result] = (await this.model.query(
      getAllTotalQuery,
    )) as ILeaderBoard[][];
    return result;
  }
}
