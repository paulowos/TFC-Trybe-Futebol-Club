import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get('/home', (req: Request, res: Response) =>
  leaderBoardController.getAllHome(req, res));

router.get('/away', (req: Request, res: Response) =>
  leaderBoardController.getAllAway(req, res));

export default router;
