"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const post_1 = require("../../../application/useCase/user/auth/post");
const postControllers = (postDbRepository, postDbRepositoryService) => {
    const postRepository = postDbRepository(postDbRepositoryService());
    const addPost = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body, "vannnnnnnnnnnnnnnnnnu");
        const { caption, fileUrl } = req.body;
        if (!fileUrl) {
            return;
        }
        const { userId } = req.params;
        const data = await (0, post_1.putData)(userId, caption, fileUrl, postRepository);
        res.json(data);
    });
    const getAllPost = async (req, res) => {
        const response = await (0, post_1.getAllPosts)(postRepository);
        res.json(response);
    };
    const fetchPosts = async (req, res) => {
        const { userId } = req.params;
        const data = await (0, post_1.postData)(userId, postRepository);
        res.json(data);
    };
    const fetchUserPosts = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.params;
        const data = await (0, post_1.dataUserPosts)(userId, postRepository);
        res.json(data);
    });
    const getUsersData = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.params;
        const data = await (0, post_1.postUsersData)(userId, postRepository);
        res.json(data);
    });
    const likedPost = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { userId } = req.body;
            const { postId } = req.params;
            const data = await (0, post_1.putLike)(postId, userId, postRepository);
            if (data)
                res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const unLikePost = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { userId } = req.body;
            console.log(req.body);
            const { postId } = req.params;
            const data = await (0, post_1.putUnLike)(postId, userId, postRepository);
            if (data)
                res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    return {
        addPost,
        getAllPost,
        fetchPosts,
        fetchUserPosts,
        getUsersData,
        likedPost,
        unLikePost
    };
};
exports.default = postControllers;
