"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const router = express_1.default.Router();
// router.use('/', (_req, _res, next) => {
//   console.log('Route /api/meetings accessed');
//   next();
// });
// router.param('resource', (req, _res, next, resource) => {
//   if (resource === 'meetings') {
//     req.meetings = findDataArrayByName(resource) as DatabaseCollection<Meeting>;
//   }
//   next();
// });
router.get('/', (_req, res) => {
    const meetings = (0, db_1.findDataArrayByName)('meetings');
    if (!meetings) {
        res.status(404).json({ error: 'Meetings not found' });
    }
    else {
        res.status(200).send(meetings.data);
    }
    ;
});
exports.default = router;
