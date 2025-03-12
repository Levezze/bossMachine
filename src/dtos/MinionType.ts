import { Request } from 'express';
import { MinionType } from '../db';

export interface MinionsRequest extends Request {
  minions?: MinionType[];
};
