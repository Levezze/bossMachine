"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const router = express_1.default.Router();
router.get('/healthcheck', (req, res) => {
    res.sendStatus(200);
});
router.get('/', (_req, res) => {
    const minionData = (0, db_1.getAllFromDatabase)('minions');
    if (!minionData)
        return res.status(404).send('Minions data not found');
    console.log(`Fetched minion data`);
    res.status(200).send(minionData);
});
router.post('/', (req, res) => {
    const newMinion = (0, db_1.addToDatabase)('minions', req.body);
    console.log('create minion', newMinion);
    res.status(201).send(newMinion);
});
router.param('minionId', (req, res, next, minionId) => {
    const requestedMinion = (0, db_1.getFromDatabaseById)('minions', minionId);
    if (!requestedMinion)
        return res.status(404).send('Minion not found');
    req.foundMinion = requestedMinion;
    console.log(`Minion number ${minionId}`, requestedMinion);
    next();
});
router.get('/:minionId', (req, res) => {
    res.status(200).send(req.foundMinion);
});
exports.default = router;
