import express from 'express';
import { findDataArrayByName } from '../../db';

export const minionsRouter = express.Router();

minionsRouter.use('/', minionsRouter, (_req, _res, next) => {
  console.log('Route /api/minions accessed');
  next();
});

// minionsRouter.param('resource', (req, res, next, resource) => {
//   if (resource === 'meetings') {
//     const meetings = findDataArrayByName(resource);
//     req.meetings = findDataArrayByName(resource)
//   }
//   next();
// });

minionsRouter.get('/', (req, res, next) => {

})
