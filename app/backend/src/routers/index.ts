import { Router } from 'express';
import teamRouter from './teamRouter';

const mainRouter = Router();

mainRouter.use('/teams', teamRouter);

export default mainRouter;
