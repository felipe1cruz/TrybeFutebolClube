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

  async validateLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      console.log(authorization);

      const user = await this.userService.validateLogin(authorization);
      const role = user?.role || null;
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
