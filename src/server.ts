import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import meetingsRouter from './routes/meetings';
import minionsRouter from './routes/minions';
import logger from './middleware/logger';

const app = express();
const PORT = process.env.PORT || 4001;

logger.info('Nodemon test');

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Mount your existing apiRouter below at the '/api' path.;
app.get('/healthcheck', (_req: Request, res: Response) => {
  console.log('healthcheck');
  res.sendStatus(200);
})

app.use('/api/meetings', meetingsRouter);
app.use('/api/minions', minionsRouter);

// This conditional is here for testing purposes:
// if (!module.parent) { 
  // Add your code to start the server listening at PORT below:

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
// }

export default app;