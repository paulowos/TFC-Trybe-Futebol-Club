import { Router } from 'express';
import teamRouter from './teamRouter';
import userRouter from './userRouter';

const mainRouter = Router();

mainRouter.use('/teams', teamRouter);
mainRouter.use('/login', userRouter);

export default mainRouter;
