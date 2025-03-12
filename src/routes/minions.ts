import express, { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { 
  getAllFromDatabase, 
  getFromDatabaseById, 
  addToDatabase, 
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} from '../db';

const router = express.Router();

router.get('/healthcheck', (req: Request, res: Response) => {
  res.sendStatus(200);
})

router.get('/', (_req: any, res: any) => {
  const minionData = getAllFromDatabase('minions');
  if (!minionData) return res.status(404).send('Minions data not found');
  console.log(`Fetched minion data`);
  res.status(200).send(minionData);
});

router.post('/', (req, res) => {
  const newMinion = addToDatabase('minions', req.body);
  console.log('create minion', newMinion);
  res.status(201).send(newMinion);
});

router.param('minionId', (req: any, res, next, minionId) => {
  const requestedMinion = getFromDatabaseById('minions', minionId);
  if (!requestedMinion) return res.status(404).send('Minion not found');
  req.minionId = minionId;
  req.foundMinion = requestedMinion;
  console.log(`Minion number ${minionId}`, requestedMinion);
  next();
});

router.get('/:minionId', (req: any, res) => {
  res.status(200).send(req.foundMinion);
});

router.put('/:minionId', (req: any, res) => {
  req.minionId = req.params.minionId;
  updateInstanceInDatabase('minions', req.body);
  res.status(200).send(req.body);
});

router.delete('/:minionId', (req: any, res) => {
  deleteFromDatabasebyId('minions', req.minionId);
  res.status(204).send(getFromDatabaseById('minions', req.minionId));
})

export default router;