import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';

const userController = new UserController();

const router = Router();

router.post('/', UserMiddleware.login, (req: Request, res: Response) =>
  userController.login(req, res));

export default router;
