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
    return {
        addUser,
        getUserByEmail,
        getUserValid,
        getUserByPhone,
        getUserByName
    };
};
exports.userDbRepository = userDbRepository;
