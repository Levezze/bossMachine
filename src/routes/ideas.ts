import { Router } from "express";
import { 
  getAllFromDatabase, 
  addToDatabase, 
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} from "../db";
const checkMillionDollarIdea = require("../checkMillionDollarIdea");

const router = Router();

router.get('/healthcheck', (_req, res) => {
  res.sendStatus(200);
});

router.get('/', (_req, res) => {
  res.status(200).send(getAllFromDatabase('ideas'));
});

router.post('/', checkMillionDollarIdea, (req, res) => {
  res.status(201).send(addToDatabase('ideas', req.body));
});

router.param('ideaId', (req: any, res, next, ideaId) => {
  const idea = getFromDatabaseById('ideas', ideaId);
  if (idea === undefined || isNaN(parseFloat(ideaId))) return res.status(404).send();
  req.id = ideaId;
  req.idea = idea;
  next();
});

router.get('/:ideaId', (req:any, res) => {
  res.status(200).json(req.idea);
});

router.put('/:ideaId', checkMillionDollarIdea, (req: any, res) => {
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);
  res.status(200).json(updatedIdea);
});

router.delete('/:ideaId', (req: any, res) => {
  deleteFromDatabasebyId('ideas', req.id);
  res.status(204).send(req.idea);
});

export default router;