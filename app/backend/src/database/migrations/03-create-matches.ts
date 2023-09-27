import { DataTypes, Model, QueryInterface } from 'sequelize';
import IMatch from '../../Interfaces/Match';
import TeamSequelizeModel from '../models/TeamSequelizeModel';
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatch>>('matches', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      homeTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'home_team_id',
        references: { model: TeamSequelizeModel, key: 'id' },
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'home_team_goals',
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_id',
        references: { model: TeamSequelizeModel, key: 'id' },
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_goals',
        references: { model: TeamSequelizeModel, key: 'id' },
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'in_progress',
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};
