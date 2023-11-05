"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    MONGO_URL: "mongodb://127.0.0.1:27017/socialmedia",
    PORT: process.env.PORT,
    secretKey: process.env.JWT_SECRET
};
exports.default = configKeys;
