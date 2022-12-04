import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
    private userService = new UserService(),
  ) {}

  async getAllMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      if (inProgress === 'true') {
        const matches = await this.matchService.getAllMatches();
        return res.status(200).json(matches);
      }

      if (inProgress === 'false') {
        const matches = await this.matchService.getFinishedMatches();
        return res.status(200).json(matches);
      }

      const matches = await this.matchService.getAllMatches();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  async changeMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      await this.userService.validateLogin(authorization);
      const match = await this.matchService.changeMatches(
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
      );
      return res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  }
}
