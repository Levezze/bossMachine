"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = __importDefault(require("./utils/logger"));
const api_1 = __importDefault(require("./api"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
logger_1.default.info('Starting server...');
/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;
// Add middleware for handling CORS requests from index.html
app.use((0, cors_1.default)());
// Add middware for parsing request bodies here:
app.use(body_parser_1.default.json());
// ✅ Serve static frontend files
app.use(express_1.default.static(path_1.default.join(process.cwd(), 'public')));
// Mount your existing apiRouter below at the '/api' path.;
app.get('/healthcheck', (_req, res) => {
    console.log('healthcheck');
    res.sendStatus(200);
});
app.use('/api', api_1.default);
// Catch-all: Serve `index.html` for React Router to work
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), 'public', 'index.html'));
});
// This conditional is here for testing purposes:
if (require.main === module) {
    // Add your code to start the server listening at PORT below:
    app.listen(PORT, () => {
        logger_1.default.info(`Server is listening on port ${PORT}`);
    });
}
exports.default = app;
