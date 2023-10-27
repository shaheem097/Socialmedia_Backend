"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes_1 = __importDefault(require("./user/userRoutes"));
const AdminRoter_1 = __importDefault(require("./admin/AdminRoter"));
const postRoutes_1 = __importDefault(require("./user/postRoutes"));
const routes = (app) => {
    app.use("/api", (0, userRoutes_1.default)());
    app.use('/api/admin', (0, AdminRoter_1.default)());
    app.use("/api", (0, postRoutes_1.default)());
};
exports.default = routes;
