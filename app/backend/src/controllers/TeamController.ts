import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  async getAllTeams(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.teamService.getAllTeams();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async getIdTeam(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await this.teamService.getIdTeam(Number(id));
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}
