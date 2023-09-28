import TeamSequelizeModel from '../database/models/TeamSequelizeModel';
import MatchSequelizeModel from '../database/models/MatchSequelizeModel';
import IMatch, { CreationIMatch } from '../Interfaces/Match';
import IMatchModel from '../Interfaces/MatchModel';

export default class MatchModel implements IMatchModel {
  private model = MatchSequelizeModel;
  async getAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: TeamSequelizeModel, attributes: ['teamName'], as: 'homeTeam' },
        { model: TeamSequelizeModel, attributes: ['teamName'], as: 'awayTeam' },
      ],
    });
    return matches;
  }

  async getAllByProgress(inProgress: boolean): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: TeamSequelizeModel, attributes: ['teamName'], as: 'homeTeam' },
        { model: TeamSequelizeModel, attributes: ['teamName'], as: 'awayTeam' },
      ],
    });
    return matches;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateGoals(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  async create(data: CreationIMatch): Promise<IMatch> {
    const newMatch = await this.model.create(data);
    return newMatch;
  }
}
