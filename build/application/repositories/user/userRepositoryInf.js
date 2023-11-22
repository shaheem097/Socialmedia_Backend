"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const addUser = async (user) => {
        return await repository.addUser(user);
    };
    const getUserByEmail = async (email) => {
        return repository.getUserByEmail(email);
    };
    const getUserByPhone = async (phone) => {
        return repository.getUserByPhone(phone);
    };
    const getUserByName = async (username) => {
        return repository.getUserByName(username);
    };
    const getUserValid = async (email) => {
        return repository.getUserValid(email);
    };
    const getAllUsers = async () => {
        return repository.getAllUsers();
    };
    const blockCurrUser = async (userId) => {
        return repository.blockCurrUser(userId);
    };
    const unBlockCurrUser = async (userId) => {
        return repository.unBlockCurrUser(userId);
    };
    const findSuggest = async (userId) => {
        return repository.suggestionUser(userId);
    };
    const putFollower = async (friendId, userId) => {
        return repository.addFollower(friendId, userId);
    };
    const removeFollow = async (friendId, userId) => {
        return repository.removeFollower(friendId, userId);
    };
    const getUserIdProfile = async (userId) => {
        return repository.getUserWidget(userId);
    };
    const updateUser = async (username, email, phone, bio, location, profileUrl, userId) => {
        return repository.updateUserData(username, email, phone, bio, location, profileUrl, userId);
    };
    const getPostsReported = async () => {
        return repository.getReportedPosts();
    };
    const reportRemove = async (postId, id) => {
        return repository.removeReport(postId, id);
    };
    const confirmReport = async (postId) => {
        return repository.reportConfirm(postId);
    };
    return {
        addUser,
        getUserByEmail,
        getUserValid,
        getUserByPhone,
        getUserByName,
        getAllUsers,
        blockCurrUser,
        unBlockCurrUser,
        findSuggest,
        putFollower,
        removeFollow,
        getUserIdProfile,
        updateUser,
        getPostsReported,
        reportRemove,
        confirmReport
    };
};
exports.userDbRepository = userDbRepository;
