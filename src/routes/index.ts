import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const routes = Router();
const userController = new UserController();

// Rotas públicas
routes.post('/users', userController.create);
routes.post('/login', userController.login);

export default routes;