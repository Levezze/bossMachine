import express from 'express';
const apiRouter = express.Router();

import meetingsRouter from './routes/meetings';
import minionsRouter from './routes/minions';
import ideasRouter from './routes/ideas';

apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter)

export default apiRouter;