import TeamsModel from '../database/models/TeamsModel';
import ValidationError from '../errors/ValidationError';
import ITeam from '../interfaces/ITeam';

export default class TeamService {
  getAllTeams = async (): Promise<ITeam[]> => {
    const teams = await TeamsModel.findAll();

    return teams;
  };

  getIdTeam = async (id: number): Promise<ITeam | null> => {
    const team = await TeamsModel.findByPk(id);

    if (!team) throw new ValidationError(400, 'Team not found');
    return team;
  };
}
