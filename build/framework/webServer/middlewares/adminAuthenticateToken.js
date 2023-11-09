"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config/config"));
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = config_1.default.secretKey;
function adminauthenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                console.log("not admin success token");
                return res.status(401).json({ status: false, message: "adminTokenNotverify" });
            }
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json({ status: false, message: "adminTokenNotverify" });
    }
}
module.exports = adminauthenticateToken;
