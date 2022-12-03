import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';
import MatchesModel from './MatchesModel';

class TeamsModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING(30),
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  tableName: 'teams',
  timestamps: false,
});

TeamsModel.hasMany(MatchesModel, { foreignKey: 'homeTeam', as: 'teamHome' });
TeamsModel.hasMany(MatchesModel, { foreignKey: 'awayTeam', as: 'teamAway' });

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchesModel.belongsTo(TeamsModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default TeamsModel;
