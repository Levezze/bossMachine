import express from 'express';
const apiRouter = express.Router();

import meetingsRouter from './routes/meetings';
import minionsRouter from './routes/minions';

apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/minions', minionsRouter);

export default apiRouter;