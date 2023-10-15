"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const connection_1 = __importDefault(require("./framework/database/mongodb/connection/connection"));
const server_1 = __importDefault(require("./framework/webServer/server"));
const express_2 = __importDefault(require("./framework/webServer/express"));
const routes_1 = __importDefault(require("./framework/webServer/routes"));
const appError_1 = __importDefault(require("./utilities/appError"));
const httpstatuscodes_1 = require("./types/httpstatuscodes");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
//mongo
(0, connection_1.default)();
// Use the middleware
(0, express_2.default)(app);
// Route
(0, routes_1.default)(app);
app.all("*", (req, res, next) => {
    next(new appError_1.default("Not Found", httpstatuscodes_1.HttpStatus.UNAUTHORIZED));
});
// Start the server
(0, server_1.default)(server).startServer();
