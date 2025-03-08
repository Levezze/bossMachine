import { Meeting, DatabaseCollection } from './db';

declare module 'express-serve-static-core' {
  interface Request {
    meetings?: DatabaseCollection<Meeting>;
  }
};