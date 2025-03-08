import express from 'express';
import { minionsRouter } from './minions'; 
import { meetingsRouter } from './meetings';

export const apiRouter = express.Router();

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/meetings', meetingsRouter);