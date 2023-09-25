import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';

class TeamSequelizeModel extends Model<
InferAttributes<TeamSequelizeModel>,
InferCreationAttributes<TeamSequelizeModel>
> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamSequelizeModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    teamName: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'teams',
  },
);

export default TeamSequelizeModel;
