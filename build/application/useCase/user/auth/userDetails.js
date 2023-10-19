"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unBlockCurrUser = exports.blockCurrUser = exports.getAllUsers = void 0;
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
