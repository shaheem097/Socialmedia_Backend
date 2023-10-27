"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = __importDefault(require("../../../../adapters/controller/user/postController"));
const postDbRepositoryInterface_1 = require("../../../../application/repositories/user/postDbRepositoryInterface");
const postRepositoryImp_1 = require("../../../database/mongodb/repositories/user/postRepositoryImp");
const postRouter = () => {
    const router = express_1.default.Router();
    const controllers = (0, postController_1.default)(postDbRepositoryInterface_1.postRepository, postRepositoryImp_1.postRepositoryMongoDb);
    router.post("/:userId", controllers.addPost);
    router.get('/getAllPost', controllers.getAllPost);
    return router;
};
exports.default = postRouter;
