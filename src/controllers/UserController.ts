import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      // Repassa os dados do body para o Service
      const user = await userService.createUser(req.body);
      // Retorna status 201 (Created) e o usuário salvo
      res.status(201).json(user);
    } catch (error: any) {
      // Se o service lançar erro (ex: email repetido), retorna 400 (Bad Request)
      res.status(400).json({ error: error.message });
    }
  }
}