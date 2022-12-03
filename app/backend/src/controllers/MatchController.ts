import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  async getAllMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      const matches = await this.matchService.getAllMatches(inProgress as string);
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

//   async getIdTeam(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { id } = req.params;
//       const team = await this.teamService.getIdTeam(Number(id));
//       return res.status(200).json(team);
//     } catch (error) {
//       next(error);
//     }
//   }
}
