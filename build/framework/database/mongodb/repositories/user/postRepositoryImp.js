"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepositoryMongoDb = void 0;
const postModel_1 = __importDefault(require("../../models/usermodels/postModel"));
const postRepositoryMongoDb = () => {
    const addPostDetails = async (userId, caption, fileUrl) => {
        const post = {
            userId: userId,
            description: caption,
            post: fileUrl
        };
        const newpost = new postModel_1.default(post);
        return newpost.save();
    };
    const getAllPosts = async () => {
        const allPosts = await postModel_1.default.find({});
        return allPosts;
    };
    return {
        addPostDetails,
        getAllPosts
    };
};
exports.postRepositoryMongoDb = postRepositoryMongoDb;
