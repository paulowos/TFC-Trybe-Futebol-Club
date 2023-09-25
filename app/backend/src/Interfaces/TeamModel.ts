import ITeam from './Team';

export interface ITeamModel {
  getAll(): Promise<ITeam[]>;
}
