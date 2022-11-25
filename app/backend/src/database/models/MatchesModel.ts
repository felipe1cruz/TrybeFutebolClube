import { INTEGER, BOOLEAN, Model } from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

class MatchesModel extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

MatchesModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

TeamsModel.hasMany(MatchesModel, { foreignKey: 'homeTeam', as: 'homeTeamMatches' });
TeamsModel.hasMany(MatchesModel, { foreignKey: 'awayTeam', as: 'awayTeamMatches' });

MatchesModel.belongsTo(TeamsModel, { foreignKey: 'homeTeam', as: 'homeTeamMatches' });
MatchesModel.belongsTo(TeamsModel, { foreignKey: 'awayTeam', as: 'awayTeamMatches' });

export default MatchesModel;
