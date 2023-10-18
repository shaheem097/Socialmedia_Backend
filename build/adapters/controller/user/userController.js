"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userDetails_1 = require("../../../application/useCase/user/auth/userDetails");
const userControllers = (userDbRepository, userDbRepositoryService) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryService());
    const getUsers = (0, express_async_handler_1.default)(async (req, res) => {
        const data = await (0, userDetails_1.getAllUsers)(dbRepositoryUser);
        res.json({ data });
    });
    return {
        getUsers
    };
};
exports.default = userControllers;
