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

router.patch('/:id/finish', tokenMiddlewares, (req: Request, res: Response) =>
  matchController.finishMatch(req, res));

router.patch('/:id', tokenMiddlewares, (req: Request, res: Response) =>
  matchController.updateGoals(req, res));

router.post('/', tokenMiddlewares, (req: Request, res: Response) =>
  matchController.create(req, res));

export default router;
