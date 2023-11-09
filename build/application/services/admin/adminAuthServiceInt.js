"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthServiceInterface = void 0;
const AdminAuthServiceInterface = (service) => {
    const generateAdminToken = async (id, name) => {
        return service.generateAdminToken(id, name);
    };
    return { generateAdminToken };
};
exports.AdminAuthServiceInterface = AdminAuthServiceInterface;
