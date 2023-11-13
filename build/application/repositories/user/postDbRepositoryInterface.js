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
    const fetchPosts = async (userId) => {
        return repository.getPosts(userId);
    };
    const fetchUserPosts = async (userId) => {
        return repository.fetchUserPost(userId);
    };
    const fetchUsersData = async (userId) => {
        return repository.fetchUsersData(userId);
    };
    const likePost = async (postId, userId) => {
        return repository.postLike(postId, userId);
    };
    const unLikePost = async (postId, userId) => {
        return repository.unLike(postId, userId);
    };
    return {
        addPost,
        getAllPosts,
        fetchPosts,
        fetchUserPosts,
        fetchUsersData,
        likePost,
        unLikePost
    };
};
exports.postRepository = postRepository;
