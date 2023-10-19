"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../../application/useCase/user/auth/userAuth");
const authController = (authServiceInterface, authService, UserDbInterface, userDbservice) => {
    const dbUserRepository = UserDbInterface(userDbservice());
    const authServices = authServiceInterface(authService());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body, "its cominggggggggggg");
        const { username, phone, email, password } = req.body;
        const user = {
            username,
            phone,
            email,
            password,
        };
        const token = await (0, userAuth_1.userRegister)(user, dbUserRepository, authServices);
        console.log(token);
        if (token.status == true) {
            res.json({ status: true, message: "User registerd", token });
        }
        else {
            res.json({ status: false, token });
        }
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const userDetails = { email, password };
        const user = await (0, userAuth_1.userLogin)(userDetails, dbUserRepository, authServices);
        console.log(user, 'uuuuuuuuuuuse');
        console.log(user.userData?.isBlock, "blooooock");
        if (user.status === true) {
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh");
            if (user.userData?.isBlock === true) {
                res.json({ blocked: true });
            }
            else {
                res.json({ status: true, user });
            }
        }
        else {
            res.json({ status: false });
        }
    });
    const loginWithGoogle = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body, "emailllllllllllllllll");
        const { email } = req.body;
        const values = { email };
        (0, userAuth_1.googleLogin)(values, dbUserRepository, authServices).then((response) => {
            console.log(response, "rrrrrrrrrrrrrsssssssssssss");
            if (response?.status === true) {
                res.json({ status: true, message: "User Logined", response });
            }
            else if (response?.blocked) {
                res.json({ blocked: true });
            }
            else {
                res.json({ status: false });
            }
        });
    });
    const checkotpNumber = (0, express_async_handler_1.default)(async (req, res) => {
        const { phone } = req.body;
        const value = { phone };
        (0, userAuth_1.checkPhone)(value, dbUserRepository).then((response) => {
            if (response?.status === true) {
                res.json({ status: true });
            }
            else if (response?.blocked === true) {
                res.json({ blocked: true });
            }
            else {
                res.json({ status: false });
            }
        });
    });
    const loginWithOtp = (0, express_async_handler_1.default)(async (req, res) => {
        console.log(req.body, "fffffffffffffffffffffffffffff");
        const { phone } = req.body;
        const data = { phone };
        console.log(data, "okkkkkkkkkkkkkkkkkkkkk");
        (0, userAuth_1.otpLogin)(data, dbUserRepository, authServices).then((response) => {
            if (response?.status === true) {
                res.json({ status: true, message: "User Logined", response });
            }
            else {
                res.json({ status: false });
            }
        });
    });
    return {
        registerUser,
        loginUser,
        loginWithGoogle,
        checkotpNumber,
        loginWithOtp
    };
};
exports.default = authController;
