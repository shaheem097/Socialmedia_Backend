"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthServices = void 0;
const config_1 = __importDefault(require("../../../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminAuthServices = () => {
    const generateAdminToken = async (id, name) => {
        if (config_1.default.secretKey) {
            const token = jsonwebtoken_1.default.sign({ id, name }, config_1.default.secretKey, {
                expiresIn: "30d",
            });
            return token;
        }
        else {
            throw new Error("JWT TOKEN is not defined");
        }
    };
    return { generateAdminToken };
};
exports.adminAuthServices = adminAuthServices;
