import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const routes = Router();
const userController = new UserController();
const authController = new AuthController();

// Rotas públicas
routes.post('/users', userController.create);
routes.post('/login', authController.login);

// Rotas protegidas (RF10)
routes.get('/users/me', authMiddleware, (req: Request, res: Response) => {
  res.json({
    message: 'Dados do usuário autenticado',
    userId: (req as any).userId,
    userRole: (req as any).userRole,
  });
});

routes.get(
  '/admin/ping',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  (req: Request, res: Response) => {
    res.json({
      message: 'Pong! Acesso autorizado ao painel de administração.',
    });
  }
);

export default routes;