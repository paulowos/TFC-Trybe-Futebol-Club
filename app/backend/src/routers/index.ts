import { Router } from 'express';

import teamRouter from './teamRouter';
import userRouter from './userRouter';
import matchRouter from './matchRouter';

const mainRouter = Router();

mainRouter.use('/teams', teamRouter);
mainRouter.use('/login', userRouter);
mainRouter.use('/matches', matchRouter);

export default mainRouter;
