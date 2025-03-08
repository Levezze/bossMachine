"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../../db");
exports.meetingsRouter = express_1.default.Router();
// meetingsRouter.use('/', (_req, _res, next) => {
//   console.log('Route /api/meetings accessed');
//   next();
// });
// meetingsRouter.param('resource', (req, _res, next, resource) => {
//   if (resource === 'meetings') {
//     req.meetings = findDataArrayByName(resource) as DatabaseCollection<Meeting>;
//   }
//   next();
// });
exports.meetingsRouter.get('/', (_req, res) => {
    const meetings = (0, db_1.findDataArrayByName)('meetings');
    if (!meetings) {
        res.status(404).json({ error: 'Meetings not found' });
    }
    else {
        res.status(200).send(meetings.data);
    }
    ;
});
