"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putComment = exports.putUnLike = exports.putLike = exports.postUsersData = exports.dataUserPosts = exports.postData = exports.getAllPosts = exports.putData = void 0;
const putData = async (userId, caption, fileUrl, postDbRepository) => {
    const data = await postDbRepository.addPost(userId, caption, fileUrl);
    return data;
};
exports.putData = putData;
const getAllPosts = async (postDbRepository) => {
    const data = await postDbRepository.getAllPosts();
    return data;
};
exports.getAllPosts = getAllPosts;
const postData = async (userId, postDbRepository) => {
    const data = await postDbRepository.fetchPosts(userId);
    return data;
};
exports.postData = postData;
const dataUserPosts = async (userId, postDbRepository) => {
    const data = await postDbRepository.fetchUserPosts(userId);
    return data;
};
exports.dataUserPosts = dataUserPosts;
const postUsersData = async (userId, postDbRepository) => {
    const usersData = await postDbRepository.fetchUsersData(userId);
    return usersData;
};
exports.postUsersData = postUsersData;
const putLike = async (postId, userId, postDbRepository) => {
    try {
        const data = await postDbRepository.likePost(postId, userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.putLike = putLike;
const putUnLike = async (postId, userId, postDbRepository) => {
    try {
        const data = await postDbRepository.unLikePost(postId, userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.putUnLike = putUnLike;
const putComment = async (postId, userId, comment, username, postDbRepository) => {
    try {
        const data = await postDbRepository.addComment(postId, userId, comment, username);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.putComment = putComment;
