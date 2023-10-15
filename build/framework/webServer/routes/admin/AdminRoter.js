"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuthController_1 = __importDefault(require("../../../../adapters/controller/admin/adminAuthController"));
const adminAuthServiceInt_1 = require("../../../../application/services/admin/adminAuthServiceInt");
const adminAuthServiceImp_1 = require("../../../services/admin/adminAuthServiceImp");
const adminRepositoryInf_1 = require("../../../../application/repositories/admin/adminRepositoryInf");
const adminAuthRepository_1 = require("../../../database/mongodb/repositories/admin/adminAuthRepository");
const adminAuthRouter = () => {
    const router = express_1.default.Router();
    const adminControllers = (0, adminAuthController_1.default)(adminAuthServiceInt_1.AdminAuthServiceInterface, adminAuthServiceImp_1.adminAuthServices, adminRepositoryInf_1.adminDbRepository, adminAuthRepository_1.adminRepositoryMongodb);
    router.post("/login", adminControllers.loginAdmin);
    return router;
};
exports.default = adminAuthRouter;
