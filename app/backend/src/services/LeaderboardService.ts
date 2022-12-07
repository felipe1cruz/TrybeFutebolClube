import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
// import ValidationError from '../errors/ValidationError';
// import IMatch from '../interfaces/IMatch';

export default class LeaderboardService {
  games = async (homeAway: string, teamId: number) => {
    const matches = await MatchesModel.findAll({ where: { inProgress: false } });
    if (homeAway === 'home') {
      return matches.filter((match) => Number(match.homeTeam) === teamId);
    }
    if (homeAway === 'away') {
      return matches.filter((match) => Number(match.awayTeam) === teamId);
    }
    return matches;
  };

  victorys = async (homeAway: string, teamId: number) => {
    if (homeAway === 'home') {
      const matches = await this.games(homeAway, teamId);
      return matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length || 0;
    }
    if (homeAway === 'away') {
      const matches = await this.games(homeAway, teamId);
      return matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length || 0;
    }
    return 0;
  };

  draws = async (homeAway: string, teamId: number) => {
    if (homeAway === 'home') {
      const matches = await this.games(homeAway, teamId);
      return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length || 0;
    }
    if (homeAway === 'away') {
      const matches = await this.games(homeAway, teamId);
      return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length || 0;
    }
    return 0;
  };

  loses = async (homeAway: string, teamId: number) => {
    if (homeAway === 'home') {
      const matches = await this.games(homeAway, teamId);
      return matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length || 0;
    }
    if (homeAway === 'away') {
      const matches = await this.games(homeAway, teamId);
      return matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length || 0;
    }
    return 0;
  };

  goals = async (homeAway: string, teamId: number) => {
    if (homeAway === 'home') {
      const matches = await this.games(homeAway, teamId);
      return matches.reduce((acc, cur) => acc + Number(cur.homeTeamGoals), 0);
    }
    if (homeAway === 'away') {
      const matches = await this.games(homeAway, teamId);
      return matches.reduce((acc, cur) => acc + Number(cur.awayTeamGoals), 0);
    }
    return 0;
  };

  goalsOwn = async (homeAway: string, teamId: number) => {
    if (homeAway === 'home') {
      const matches = await this.games(homeAway, teamId);
      return matches.reduce((acc, cur) => acc + Number(cur.awayTeamGoals), 0);
    }
    if (homeAway === 'away') {
      const matches = await this.games(homeAway, teamId);
      return matches.reduce((acc, cur) => acc + Number(cur.homeTeamGoals), 0);
    }
    return 0;
  };

  totalPoints = async (homeAway: string, teamId: number) => {
    const victoryPoints = await this.victorys(homeAway, teamId);
    const drawPoints = await this.draws(homeAway, teamId);
    const points = (victoryPoints * 3) + drawPoints;
    return points;
  };

  efficiency = async (homeAway: string, teamId: number) => {
    const points = await this.totalPoints(homeAway, teamId);
    const maxPoints = (await this.games(homeAway, teamId)).length * 3;
    return ((points / maxPoints) * 100).toFixed(2);
  };

  scoreMount = async (homeAway: string) => {
    const teams = await TeamsModel.findAll();

    const teamPoints = await Promise.all(teams.map(async (team) => ({
      name: team.teamName,
      totalPoints: await this.totalPoints(homeAway, team.id),
      totalGames: await (await this.games(homeAway, team.id)).length,
      totalVictories: await this.victorys(homeAway, team.id),
      totalDraws: await this.draws(homeAway, team.id),
      totalLoses: await this.loses(homeAway, team.id),
      goalsFavor: await this.goals(homeAway, team.id),
      goalsOwn: await this.goalsOwn(homeAway, team.id),
      goalsBalance: await this.goals(homeAway, team.id) - await this.goalsOwn(homeAway, team.id),
      efficiency: await this.efficiency(homeAway, team.id),
    })));
    return teamPoints || 0;
  };

  leaderboardMount = async (homeAway: string) => {
    const teamPoints = await this.scoreMount(homeAway);
    const teamSort = teamPoints.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || a.goalsOwn - b.goalsOwn);
    return teamSort;
  };
}
