"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepositoryMongoDb = void 0;
const postModel_1 = __importDefault(require("../../models/usermodels/postModel"));
const userModel_1 = __importDefault(require("../../models/usermodels/userModel"));
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
    const getPosts = async (userId) => {
        const user = await userModel_1.default.findById(userId);
        const followingIds = user.following;
        followingIds.push(userId);
        const data = await postModel_1.default.find({ userId: { $in: followingIds } });
        return data;
    };
    const fetchUserPost = async (userId) => {
        const data = await postModel_1.default.find({ userId: userId });
        return data;
    };
    const fetchUsersData = async (userId) => {
        const data = await userModel_1.default.find({ userId: userId });
        console.log(data, "postuserssssssssss");
        return data;
    };
    return {
        addPostDetails,
        getAllPosts,
        getPosts,
        fetchUserPost,
        fetchUsersData
    };
};
exports.postRepositoryMongoDb = postRepositoryMongoDb;
