import { Router } from "express";
import { 
  getAllFromDatabase, 
  addToDatabase, 
  getFromDatabaseById 
} from "../db";

const router = Router();

router.get('/healthcheck', (_req, res) => {
  res.sendStatus(200);
});

router.get('/', (_req, res) => {
  res.status(200).send(getAllFromDatabase('ideas'));
});

router.post('/', (req, res) => {
  res.status(201).send(addToDatabase('ideas', req.body));
});

router.param('ideaId', (req: any, res, next, ideaId) => {
  const idea = getFromDatabaseById('ideas', ideaId)
  req.id = ideaId;
  req.idea = idea;
  next();
});

router.get('/:ideaId', (req, res) => {
  
})

export default router;