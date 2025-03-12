import express, { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { getAllFromDatabase, getFromDatabaseById, MinionType, addToDatabase } from '../db';

const router = express.Router();

router.get('/healthcheck', (req: Request, res: Response) => {
  res.sendStatus(200);
})

router.get('/', (_req: any, res: any) => {
  const minionData = getAllFromDatabase('minions');
  if (!minionData) return res.status(404).send('Minions data not found');
  console.log(`Fetched minion data:`, minionData);
  res.status(200).send(minionData);
});

router.post('/', (req: any, res: any) => {
  const newMinion: MinionType = req.body;
  if (!newMinion.name || !newMinion.title || !newMinion.salary || !newMinion.weaknesses) {
    return res.status(400).send('Invalid minion data');
  }
  addToDatabase('minions', req.body)
  res.status(200).send(req.body);
});


router.param('minionId', (req: any, res, next, minionId) => {
  const requestedMinion = getFromDatabaseById('minions', minionId);
  if (!requestedMinion) return res.status(404).send('Minion not found');
  req.foundMinion = requestedMinion;
  console.log(`Minion number ${minionId}`, requestedMinion);
  next();
});

router.get('/:minionId', (req: any, res) => {
  res.status(200).send(req.foundMinion);
});

export default router;