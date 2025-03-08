"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.minionsRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.minionsRouter = express_1.default.Router();
exports.minionsRouter.use('/', exports.minionsRouter, (_req, _res, next) => {
    console.log('Route /api/minions accessed');
    next();
});
// minionsRouter.param('resource', (req, res, next, resource) => {
//   if (resource === 'meetings') {
//     const meetings = findDataArrayByName(resource);
//     req.meetings = findDataArrayByName(resource)
//   }
//   next();
// });
exports.minionsRouter.get('/', (req, res, next) => {
});
