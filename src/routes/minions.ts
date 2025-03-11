import express from 'express';
import { findDataArrayByName } from '../db';

const router = express.Router();

router.use('/', router, (_req, _res, next) => {
  console.log('Route /api/minions accessed');
  next();
});

// router.param('resource', (req, res, next, resource) => {
//   if (resource === 'meetings') {
//     const meetings = findDataArrayByName(resource);
//     req.meetings = findDataArrayByName(resource)
//   }
//   next();
// });

router.get('/', (req, res, next) => {

})

export default router;