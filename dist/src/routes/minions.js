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
    console.log(`Fetched minion data:`, minionData);
    res.status(200).send(minionData);
});
router.post('/', (req, res) => {
    const newMinion = req.body;
    if (!newMinion.name || !newMinion.title || !newMinion.salary || !newMinion.weaknesses) {
        return res.status(400).send('Invalid minion data');
    }
    (0, db_1.addToDatabase)('minions', req.body);
    res.status(200).send(req.body);
});
router.param('minionId', (req, res, next, minionId) => {
    if (!minionId)
        return res.status(404).send('Minion not found');
    req.minionId = minionId;
    console.log('test param', (0, db_1.getFromDatabaseById)('minions', req.minionId));
    next();
});
router.get('/:minionId', (req, res) => {
    res.status(200).send(req.minionId);
});
exports.default = router;
