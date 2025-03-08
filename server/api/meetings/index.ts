import express, { Request, Response, NextFunction } from 'express';
import { findDataArrayByName } from '../../db';
import { Meeting, DatabaseCollection } from '../../db';

export const meetingsRouter = express.Router();

interface MeetingsRequest extends Request {
  meetings?: DatabaseCollection<Meeting>;
}

// meetingsRouter.use('/', (_req, _res, next) => {
//   console.log('Route /api/meetings accessed');
//   next();
// });

// meetingsRouter.param('resource', (req, _res, next, resource) => {
//   if (resource === 'meetings') {
//     req.meetings = findDataArrayByName(resource) as DatabaseCollection<Meeting>;
//   }
//   next();
// });

meetingsRouter.get('/', (_req: Request, res: Response) => {
  const meetings = findDataArrayByName('meetings');
  if (!meetings) {
    res.status(404).json({ error: 'Meetings not found' });
  } else {
  res.status(200).send(meetings.data as Meeting[] | null);
  };
});
