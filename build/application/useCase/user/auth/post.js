"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = exports.putData = void 0;
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
