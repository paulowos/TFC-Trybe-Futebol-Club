import ITeam from '../Interfaces/Team';
import TeamSequelizeModel from '../database/models/TeamSequelizeModel';
import { ITeamModel } from '../Interfaces/TeamModel';

export default class TeamModel implements ITeamModel {
  private model = TeamSequelizeModel;

  async getAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
