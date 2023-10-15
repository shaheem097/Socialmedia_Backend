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
        // if(user.status){
        //     const {userExist}=user;
        //     const {token}=user;
        //     if(userExist.isBlock){
        //         res.json({blocked:"Blocked by admin"})
        if (user.status === true) {
            res.json({ status: true, user });
        }
        else {
            res.json({ status: false });
        }
    });
    const googleUser = (0, express_async_handler_1.default)(async (req, res) => {
        console.log("vannuuuuuuuuuuuuuuuuuuuuuuuuu");
        const { email } = req.body;
        console.log(req.body);
        const values = { email };
        (0, userAuth_1.addUser)(values, dbUserRepository, authServices).then((response) => {
            console.log(response, "controleriiiiiiiiiiiii");
            if (response?.status === true) {
                res.json({ status: true, message: "User registered", response });
            }
            else {
                res.json({ status: false });
            }
        });
    });
    return {
        registerUser,
        loginUser,
        googleUser,
    };
};
exports.default = authController;
