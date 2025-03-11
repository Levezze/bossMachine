import express, { Request, Response, NextFunction } from 'express';
import { findDataArrayByName } from '../db';
import { Meeting, DatabaseCollection } from '../db';

const router = express.Router();

router.get('/healthcheck', (_req: Request, res: Response) => {
  res.sendStatus(200);
});

// router.use('/', (_req, _res, next) => {
//   console.log('Route /api/meetings accessed');
//   next();
// });

// router.param('resource', (req, _res, next, resource) => {
//   if (resource === 'meetings') {
//     req.meetings = findDataArrayByName(resource) as DatabaseCollection<Meeting>;
//   }
//   next();
// });

router.get('/', (_req: Request, res: Response) => {
  const meetings = findDataArrayByName('meetings');
  if (!meetings) {
    res.status(404).json({ error: 'Meetings not found' });
  } else {
  res.status(200).send(meetings.data as Meeting[] | null);
  };
});

export default router;