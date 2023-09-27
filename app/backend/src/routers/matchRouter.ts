import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const matchController = new MatchController();

const tokenMiddlewares = [
  AuthMiddleware.verifyHeader,
  AuthMiddleware.validateToken,
];

const router = Router();

router.get('/', (req: Request, res: Response) =>
  matchController.getAll(req, res));

// router.use(tokenMiddlewares);

router.patch('/:id/finish', tokenMiddlewares, (req: Request, res: Response) =>
  matchController.finishMatch(req, res));

export default router;
