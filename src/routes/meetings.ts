import express, { Request, Response, NextFunction } from 'express';
import { getAllFromDatabase, createMeeting, deleteAllFromDatabase, addToDatabase } from '../db';
import { Meeting } from '../db';

const router = express.Router();

router.get('/healthcheck', (_req: Request, res: Response) => {
  res.sendStatus(200);
});

router.get('/', (_req: Request, res: Response) => {
  const meetings = getAllFromDatabase('meetings');
  if (!meetings) {
    res.status(404).json({ error: 'Meetings not found' });
  } else {
    res.status(200).send(meetings as Meeting[] | null);
  };
});

router.post('/', (_req: Request, res: Response) => {
  const newMeeting = createMeeting();
  addToDatabase('meetings', newMeeting);
  res.status(201).send(newMeeting);
});

router.delete('/', (_req: Request, res: Response) => {
  deleteAllFromDatabase('meetings');
  console.log(`deleting all meetings`);
  res.status(204).send();
})

export default router;