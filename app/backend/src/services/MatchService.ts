import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
// import ValidationError from '../errors/ValidationError';
// import IMatch from '../interfaces/IMatch';

export default class MatchService {
  getAllMatches = async (inProgress: string | undefined) => {
    if (inProgress === 'true') {
      const matches = await MatchesModel.findAll({
        include: [
          { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
        where: { inProgress: true },
      });
      return matches;
    }

    const matches = await MatchesModel.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    console.log(matches);

    return matches;
  };

  // getIdTeam = async (id: number): Promise<ITeam | null> => {
  //   const team = await TeamsModel.findByPk(id);

  //   if (!team) throw new ValidationError(400, 'Team not found');
  //   return team;
  // };
}
