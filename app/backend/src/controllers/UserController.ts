import { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  async makeLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await this.userService.makeLogin({ email, password });
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
