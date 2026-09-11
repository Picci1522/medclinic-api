import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const routes = Router();
const userController = new UserController();

// Define a rota POST para criar usuários
routes.post('/users', userController.create);

export default routes;