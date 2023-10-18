"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
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
