import { DataTypes, Model, QueryInterface } from 'sequelize';
import IMatch from '../../Interfaces/Match';
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.changeColumn('matches', 'inProgress', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'in_progress',
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.changeColumn('matches', 'inProgress', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'in_progress',
    });
  },
};
