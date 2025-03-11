"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const meetings_1 = __importDefault(require("./routes/meetings"));
const minions_1 = __importDefault(require("./routes/minions"));
const logger_1 = __importDefault(require("./middleware/logger"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4001;
logger_1.default.info('Nodemon test');
/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
// Add middleware for handling CORS requests from index.html
app.use((0, cors_1.default)());
// Add middware for parsing request bodies here:
app.use(body_parser_1.default.json());
// Mount your existing apiRouter below at the '/api' path.;
app.get('/healthcheck', (_req, res) => {
    console.log('healthcheck');
    res.sendStatus(200);
});
app.use('/api/meetings', meetings_1.default);
app.use('/api/minions', minions_1.default);
// This conditional is here for testing purposes:
// if (!module.parent) { 
// Add your code to start the server listening at PORT below:
app.listen(PORT, () => {
    logger_1.default.info(`Server is listening on port ${PORT}`);
});
// }
exports.default = app;
