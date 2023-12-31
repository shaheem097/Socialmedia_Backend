"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
const checkAdmin = async (admin, adminRepository, adminAuthService) => {
    let credentials = {
        adminName: "shaheem",
        email: "admin@gmail.com",
        password: "admin123",
    };
    if (admin.password == credentials.password &&
        admin.email == credentials.email) {
        let id = 1516239022;
        const token = await adminAuthService.generateAdminToken(id.toString(), credentials.adminName);
        return { status: true, admin, token };
    }
    else {
        return { status: false };
    }
    return {
        checkAdmin: exports.checkAdmin,
    };
};
exports.checkAdmin = checkAdmin;
