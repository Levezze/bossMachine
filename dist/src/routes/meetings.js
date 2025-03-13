"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const router = express_1.default.Router();
router.get('/healthcheck', (_req, res) => {
    res.sendStatus(200);
});
router.get('/', (_req, res) => {
    const meetings = (0, db_1.getAllFromDatabase)('meetings');
    if (!meetings) {
        res.status(404).json({ error: 'Meetings not found' });
    }
    else {
        res.status(200).send(meetings);
    }
    ;
});
router.post('/', (_req, res) => {
    const newMeeting = (0, db_1.createMeeting)();
    (0, db_1.addToDatabase)('meetings', newMeeting);
    res.status(201).send(newMeeting);
});
router.delete('/', (_req, res) => {
    (0, db_1.deleteAllFromDatabase)('meetings');
    console.log(`deleting all meetings`);
    res.status(204).send();
});
exports.default = router;
