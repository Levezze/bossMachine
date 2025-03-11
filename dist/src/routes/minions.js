"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const logger_1 = __importDefault(require("../utils/logger"));
const router = express_1.default.Router();
router.get('/healthcheck', (req, res) => {
    res.sendStatus(200);
});
// router.param('minions', (req: Minions, res: Response, next: NextFunction, minions: string) => {
//   logger.info(`router param called with: ${minions}`);
//   const minionData = findDataArrayByName(minions);
//   logger.info(`Fetched minion data:`, minionData);
//   if (!minionData) return res.status(404).send('Minions data not found');
//   req.minions = minionData;
//   next();
// });
router.get('/', (_req, res) => {
    const minionData = (0, db_1.findDataArrayByName)('minions');
    logger_1.default.info(`Fetched minion data:`, minionData);
    if (!minionData)
        return res.status(404).send('Minions data not found');
    res.status(200).send(minionData);
});
exports.default = router;
