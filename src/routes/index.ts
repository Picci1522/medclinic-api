import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const routes = Router();
const userController = new UserController();

// Rotas públicas
routes.post('/users', userController.create);
routes.post('/login', userController.login);

// Rota protegida por JWT (Autenticação)
routes.get('/profile', authMiddleware, (req: Request, res: Response) => {
  res.json({
    message: 'Acesso autorizado',
    userId: (req as any).userId,
    userRole: (req as any).userRole
  });
});

// Rota protegida por perfil (RBAC) - Apenas ADMIN
routes.get('/admin', authMiddleware, roleMiddleware(['ADMIN']), (req: Request, res: Response) => {
  res.json({
    message: 'Painel administrativo acessado com sucesso'
  });
});

export default routes;