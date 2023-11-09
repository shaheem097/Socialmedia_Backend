"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUsersData = exports.dataUserPosts = exports.postData = exports.getAllPosts = exports.putData = void 0;
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
