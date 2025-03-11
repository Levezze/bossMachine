import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from './utils/logger';
import apiRouter from './api';
import path from 'path';

const app = express();

logger.info('Starting server...');

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/

const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// ✅ Serve static frontend files
app.use(express.static(path.join(process.cwd(), 'public')));

// Mount your existing apiRouter below at the '/api' path.;
app.get('/healthcheck', (_req: Request, res: Response) => {
  console.log('healthcheck');
  res.sendStatus(200);
});

app.use('/api', apiRouter);

// Catch-all: Serve `index.html` for React Router to work
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// This conditional is here for testing purposes:
if (require.main === module) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`);
  });
}

export default app;