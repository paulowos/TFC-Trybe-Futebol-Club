import IMatch from './Match';

export default interface IMatchModel {
  getAll(): Promise<IMatch[]>;
  getAllByProgress(inProgress: boolean): Promise<IMatch[]>;
}
