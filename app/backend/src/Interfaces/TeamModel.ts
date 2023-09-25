import ITeam from './Team';

export interface ITeamModel {
  getAll(): Promise<ITeam[]>;
  getById(id: number): Promise<ITeam | null>;
}
