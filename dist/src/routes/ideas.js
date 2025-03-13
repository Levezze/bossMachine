"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const checkMillionDollarIdea = require("../checkMillionDollarIdea");
const router = (0, express_1.Router)();
router.get('/healthcheck', (_req, res) => {
    res.sendStatus(200);
});
router.get('/', (_req, res) => {
    res.status(200).send((0, db_1.getAllFromDatabase)('ideas'));
});
router.post('/', checkMillionDollarIdea, (req, res) => {
    res.status(201).send((0, db_1.addToDatabase)('ideas', req.body));
});
router.param('ideaId', (req, res, next, ideaId) => {
    const idea = (0, db_1.getFromDatabaseById)('ideas', ideaId);
    if (idea === undefined || isNaN(parseFloat(ideaId)))
        return res.status(404).send();
    req.id = ideaId;
    req.idea = idea;
    next();
});
router.get('/:ideaId', (req, res) => {
    res.status(200).json(req.idea);
});
router.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
    const updatedIdea = (0, db_1.updateInstanceInDatabase)('ideas', req.body);
    res.status(200).json(updatedIdea);
});
router.delete('/:ideaId', (req, res) => {
    (0, db_1.deleteFromDatabasebyId)('ideas', req.id);
    res.status(204).send(req.idea);
});
exports.default = router;
