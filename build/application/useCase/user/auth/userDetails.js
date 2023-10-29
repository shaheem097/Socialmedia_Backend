"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFollower = exports.addFollower = exports.suggestFriend = exports.unBlockCurrUser = exports.blockCurrUser = exports.getAllUsers = void 0;
const getAllUsers = async (userRepository) => {
    try {
        const details = await userRepository.getAllUsers();
        return details;
    }
    catch (err) {
        console.log(err, "error in use case");
    }
};
exports.getAllUsers = getAllUsers;
const blockCurrUser = async (userId, userRepository) => {
    try {
        const status = await userRepository.blockCurrUser(userId);
        return status;
    }
    catch (error) {
        console.log(error);
    }
};
exports.blockCurrUser = blockCurrUser;
const unBlockCurrUser = async (userId, userRepository) => {
    try {
        const status = await userRepository.unBlockCurrUser(userId);
        return status;
    }
    catch (error) {
        console.log(error);
    }
};
exports.unBlockCurrUser = unBlockCurrUser;
const suggestFriend = async (userId, userRepository) => {
    try {
        const data = await userRepository.findSuggest(userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.suggestFriend = suggestFriend;
const addFollower = async (friendId, userId, userRepository) => {
    try {
        const data = await userRepository.putFollower(friendId, userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.addFollower = addFollower;
const removeFollower = async (friendId, userId, userRepository) => {
    try {
        const data = await userRepository.removeFollow(friendId, userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.removeFollower = removeFollower;
