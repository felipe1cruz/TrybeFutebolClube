import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import ValidationError from '../errors/ValidationError';
// import IMatch from '../interfaces/IMatch';

export default class MatchService {
  getMatchesInProgress = async () => {
    const matches = await MatchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: true },
    });
    return matches;
  };

  getAllMatches = async () => {
    const matches = await MatchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  };

  getFinishedMatches = async () => {
    const matches = await MatchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: false },
    });
    return matches;
  };

  validateMatches = async (
    homeTeam: number,
    awayTeam: number,
  ) => {
    if (homeTeam === awayTeam) {
      throw new
      ValidationError(422, 'It is not possible to create a match with two equal teams');
    }
    const findHomeTeam = await TeamsModel.findByPk(homeTeam);
    const findAwayTeam = await TeamsModel.findByPk(awayTeam);
    if (!findHomeTeam || !findAwayTeam) {
      throw new ValidationError(404, 'There is no team with such id!');
    }
  };

  InsertMatch = async (
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => {
    await this.validateMatches(homeTeam, awayTeam);
    const insertMatch = await MatchesModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: 1,
    });
    console.log(insertMatch);
    return insertMatch;
  };
}
