import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const routes = Router();
const userController = new UserController();

// Rotas públicas (Cadastro e Login)
routes.post('/users', userController.create);
routes.post('/login', userController.login);

// RF10: Rota para retornar os dados do usuário logado
routes.get('/users/me', authMiddleware, (req: Request, res: Response) => {
  res.json({
    message: 'Dados do usuário autenticado',
    userId: (req as any).userId,
    userRole: (req as any).userRole,
  });
});

// RF10: Rota protegida, exclusiva para o perfil Administrador (Demonstra o RBAC)
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