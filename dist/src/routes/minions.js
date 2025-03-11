"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use('/', router, (_req, _res, next) => {
    console.log('Route /api/minions accessed');
    next();
});
// router.param('resource', (req, res, next, resource) => {
//   if (resource === 'meetings') {
//     const meetings = findDataArrayByName(resource);
//     req.meetings = findDataArrayByName(resource)
//   }
//   next();
// });
router.get('/', (req, res, next) => {
});
exports.default = router;
