import IMatch from './Match';

export default interface IMatchModel {
  getAll(): Promise<IMatch[]>;
}
