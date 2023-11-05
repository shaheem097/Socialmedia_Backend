"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServiceInterface = void 0;
const AuthServiceInterface = (service) => {
    const encryptPassword = async (password) => {
        return await service.encryptPassword(password);
    };
    const generateToken = async (userId, username) => {
        return service.generateToken(userId, username);
    };
    const comparePassword = async (password, bodyPassword) => {
        return await service.comparePassword(password, bodyPassword);
    };
    return {
        encryptPassword,
        generateToken,
        comparePassword,
    };
};
exports.AuthServiceInterface = AuthServiceInterface;
