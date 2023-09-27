import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import db from '.';
import TeamSequelizeModel from './TeamSequelizeModel';

class MatchSequelizeModel extends Model<
InferAttributes<MatchSequelizeModel>,
InferCreationAttributes<MatchSequelizeModel>
> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: CreationOptional<boolean>;
}

MatchSequelizeModel.init(
  {
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
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'matches',
  },
);

MatchSequelizeModel.hasOne(TeamSequelizeModel, {
  foreignKey: 'id',
  sourceKey: 'homeTeamId',
  as: 'homeTeam',
});
MatchSequelizeModel.hasOne(TeamSequelizeModel, {
  foreignKey: 'id',
  sourceKey: 'awayTeamId',
  as: 'awayTeam',
});

export default MatchSequelizeModel;
