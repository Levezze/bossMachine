"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRouter = express_1.default.Router();
const meetings_1 = __importDefault(require("./routes/meetings"));
const minions_1 = __importDefault(require("./routes/minions"));
const ideas_1 = __importDefault(require("./routes/ideas"));
apiRouter.use('/meetings', meetings_1.default);
apiRouter.use('/minions', minions_1.default);
apiRouter.use('/ideas', ideas_1.default);
exports.default = apiRouter;
