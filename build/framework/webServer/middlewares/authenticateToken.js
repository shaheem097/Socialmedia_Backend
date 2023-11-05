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
// Replace with a strong, unique secret key
// Middleware to check JWT token on protected routes
function authenticateToken(req, res, next) {
    console.log(req.headers, "headersssssssssss");
    console.log(req.header, "headerrrrrrrr");
    const token = req.headers['authorization'];
    console.log(token, "oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                console.log("not successs token");
                return res.json({ status: false, message: "verify token not found" });
            }
            console.log("sucesssssss,oppppppppppppppppppppppppppppppppppppppppppppppppppppppp");
            req.user = user;
            next();
        });
    }
    else {
        return res.json({ status: false, message: "token not found" });
    }
}
module.exports = authenticateToken;
