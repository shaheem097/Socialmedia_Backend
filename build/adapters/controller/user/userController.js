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
    const blockUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.params;
        console.log(userId, "iiiiiiddddddddd");
        const status = await (0, userDetails_1.blockCurrUser)(userId, dbRepositoryUser);
        console.log(status, "controllerrrrrr");
        res.json({ status });
    });
    const unblockUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.params;
        const status = await (0, userDetails_1.unBlockCurrUser)(userId, dbRepositoryUser);
        console.log(status, "un block controllerrrrrr");
        res.json({ status });
    });
    const reportedPosts = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const data = await (0, userDetails_1.getReportedPosts)(dbRepositoryUser);
            res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const reportRemove = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { postId, id } = req.body;
            const data = await (0, userDetails_1.removeReport)(postId, id, dbRepositoryUser);
            if (data) {
                res.json({ status: true });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const confirmReport = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { postId } = req.params;
            const data = await (0, userDetails_1.reportConfirm)(postId, dbRepositoryUser);
            res.json({ status: true });
        }
        catch (error) {
            console.log(error);
        }
    });
    return {
        getUsers,
        blockUser,
        unblockUser,
        reportedPosts,
        reportRemove,
        confirmReport
    };
};
exports.default = userControllers;
