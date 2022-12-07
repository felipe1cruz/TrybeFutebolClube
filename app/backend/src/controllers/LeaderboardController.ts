import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  async homeTeamPosition(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboard = await this.leaderboardService.leaderboardMount('home');
      return res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }

  async awayTeamPosition(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboard = await this.leaderboardService.leaderboardMount('away');
      return res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }
}
