"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const postRepository = (repository) => {
    const addPost = async (userId, caption, fileUrl) => {
        return repository.addPostDetails(userId, caption, fileUrl);
    };
    const getAllPosts = async () => {
        return repository.getAllPosts();
    };
    return {
        addPost,
        getAllPosts
    };
};
exports.postRepository = postRepository;
