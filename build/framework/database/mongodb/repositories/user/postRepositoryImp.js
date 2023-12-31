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
        const data = await postModel_1.default.find({
            userId: { $in: followingIds },
            adminDeleted: { $ne: Boolean(true.toString()) }, // Exclude posts with adminDeleted: true
        });
        return data;
    };
    const fetchUserPost = async (userId) => {
        const data = await postModel_1.default.find({
            userId: userId,
            adminDeleted: false, // Add this condition to exclude adminDeleted: true posts
        });
        return data;
    };
    const fetchUsersData = async (userId) => {
        const data = await userModel_1.default.findById(userId);
        return data;
    };
    const postLike = async (postId, userId) => {
        console.log(postId, userId);
        const data = await postModel_1.default.updateOne({ _id: postId, likes: { $ne: userId } }, {
            $addToSet: {
                likes: userId,
            },
        });
        return true;
    };
    const unLike = async (postId, userId) => {
        const data = await postModel_1.default.updateOne({ _id: postId }, {
            $pull: {
                likes: userId,
            },
        }, {
            new: true,
        });
        return true;
    };
    const putComment = async (postId, userId, comment, username, dp) => {
        const newId = postId.replace(/:/g, "");
        try {
            const post = await postModel_1.default.findByIdAndUpdate({ _id: newId }, { $push: { comments: { userId: userId, comment: comment, username: username, dp: dp } } }, { new: true });
            return post;
        }
        catch (error) {
            console.log(error);
        }
    };
    const postDeleteComment = async (postId, userId, index) => {
        const newId = postId.replace(/:/g, "");
        try {
            const post = await postModel_1.default.findById(newId);
            if (!post) {
                return;
            }
            post.comments.splice(index, 1);
            await post.save();
            return post;
        }
        catch (error) {
            console.log(error);
        }
    };
    const postDelete = async (postId) => {
        try {
            await postModel_1.default.deleteOne({ _id: postId });
            return true;
        }
        catch (error) {
            console.log(error);
        }
    };
    const postEdit = async (postId, text) => {
        try {
            await postModel_1.default.updateOne({ _id: postId }, {
                $set: {
                    description: text,
                },
            }).then((res) => {
                console.log(res, "editpost");
                return true;
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    const addReport = async (postId, userId, reason) => {
        try {
            const newId = postId.replace(/:/g, "");
            const post = await postModel_1.default.findById(newId);
            if (post) {
                const isUserReported = post?.report?.some((report) => report?.userId === userId);
                if (!isUserReported) {
                    post?.report?.push({ userId: userId, reason: reason });
                    const updatedPost = await post.save();
                    return updatedPost;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    };
    return {
        addPostDetails,
        getAllPosts,
        getPosts,
        fetchUserPost,
        fetchUsersData,
        postLike,
        unLike,
        putComment,
        postDeleteComment,
        postDelete,
        postEdit,
        addReport
    };
};
exports.postRepositoryMongoDb = postRepositoryMongoDb;
