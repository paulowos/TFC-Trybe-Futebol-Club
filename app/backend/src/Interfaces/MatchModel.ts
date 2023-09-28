import IMatch, { CreationIMatch } from './Match';

export default interface IMatchModel {
  getAll(): Promise<IMatch[]>;
  getAllByProgress(inProgress: boolean): Promise<IMatch[]>;
  finishMatch(id: number): Promise<void>;
  updateGoals(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number
  ): Promise<void>;

  create(data: CreationIMatch): Promise<IMatch>;
}
