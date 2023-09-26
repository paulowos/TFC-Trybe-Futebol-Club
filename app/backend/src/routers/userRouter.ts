import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const userController = new UserController();

const tokenMiddlewares = [
  AuthMiddleware.verifyHeader,
  AuthMiddleware.validateToken,
];

const router = Router();

router.post('/', UserMiddleware.login, (req: Request, res: Response) =>
  userController.login(req, res));

router.get('/role', tokenMiddlewares, UserController.getRole);

export default router;
