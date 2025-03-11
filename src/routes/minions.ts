import express, { NextFunction, Request, Response } from 'express';
import { findDataArrayByName } from '../db';
import logger from '../utils/logger';

const router = express.Router();

router.get('/healthcheck', (req: Request, res: Response) => {
  res.sendStatus(200);
})

interface Minions extends Request {
  minions?: any;
}

// router.param('minions', (req: Minions, res: Response, next: NextFunction, minions: string) => {
//   logger.info(`router param called with: ${minions}`);
//   const minionData = findDataArrayByName(minions);
//   logger.info(`Fetched minion data:`, minionData);

//   if (!minionData) return res.status(404).send('Minions data not found');
//   req.minions = minionData;
//   next();
// });

router.get('/', (_req: Minions, res: any) => {
  const minionData = findDataArrayByName('minions');
  logger.info(`Fetched minion data:`, minionData);

  if (!minionData) return res.status(404).send('Minions data not found');
  res.status(200).send(minionData);
});

export default router;