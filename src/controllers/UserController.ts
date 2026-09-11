import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      // Repassa o erro para o errorMiddleware
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.login(req.body);
      res.status(200).json(result);
    } catch (error) {
      // Repassa o erro para o errorMiddleware
      next(error);
    }
  }
}