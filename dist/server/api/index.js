"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const minions_1 = require("./minions");
const meetings_1 = require("./meetings");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use('/minions', minions_1.minionsRouter);
exports.apiRouter.use('/meetings', meetings_1.meetingsRouter);
