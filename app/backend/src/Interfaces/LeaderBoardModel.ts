import ILeaderBoard from './LeaderBoard';

export default interface ILeaderBoardModel {
  getAllHome(): Promise<ILeaderBoard[]>;
}