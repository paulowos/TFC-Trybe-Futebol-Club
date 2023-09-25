import ServiceResponse from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/TeamModel';
import TeamModel from '../models/TeamModel';
import ITeam from '../Interfaces/Team';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) {}

  async getAll(): Promise<ServiceResponse<ITeam[]>> {
    const body = await this.teamModel.getAll();
    return { status: 'OK', body };
  }

  async getById(id: number): Promise<ServiceResponse<ITeam>> {
    const body = await this.teamModel.getById(id);
    if (!body) {
      return {
        status: 'NOT_FOUND',
        body: { message: `Team with id ${id} not found` },
      };
    }
    return { status: 'OK', body };
  }
}
