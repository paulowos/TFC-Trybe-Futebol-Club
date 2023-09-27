import IMatch from './Match';

export default interface IMatchModel {
  getAll(): Promise<IMatch[]>;
  getAllByProgress(inProgress: boolean): Promise<IMatch[]>;
  finishMatch(id: number): Promise<void>;
}
