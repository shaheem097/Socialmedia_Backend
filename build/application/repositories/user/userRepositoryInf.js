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
        putFollower
    };
};
exports.userDbRepository = userDbRepository;
