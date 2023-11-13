"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../../application/useCase/user/auth/userAuth");
const userDetails_1 = require("../../../application/useCase/user/auth/userDetails");
const authController = (authServiceInterface, authService, UserDbInterface, userDbservice) => {
    const dbUserRepository = UserDbInterface(userDbservice());
    const authServices = authServiceInterface(authService());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { username, phone, email, password } = req.body;
        const user = {
            username,
            phone,
            email,
            password,
        };
        const response = await (0, userAuth_1.userRegister)(user, dbUserRepository, authServices);
        console.log(response, "registerrrrrrr");
        const UserData = response.userData;
        if (response.status == true) {
            const token = response.token;
            res.json({ status: true, message: "User registerd", UserData, token });
        }
        else {
            res.json({ status: false, UserData });
        }
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const userDetails = { email, password };
        const user = await (0, userAuth_1.userLogin)(userDetails, dbUserRepository, authServices);
        if (user.status === true) {
            const userData = user.userData;
            const token = user.token;
            if (userData?.isBlock === true) {
                res.json({ blocked: true });
            }
            else {
                res.json({ status: true, userData, token });
            }
        }
        else {
            res.json({ status: false });
        }
    });
    const loginWithGoogle = (0, express_async_handler_1.default)(async (req, res) => {
        const { email } = req.body;
        const values = { email };
        try {
            const response = await (0, userAuth_1.googleLogin)(values, dbUserRepository, authServices);
            if (response?.status === true) {
                if (response.userData) {
                    const token = response.token;
                    const userData = response.userData;
                    res.json({ status: true, message: "User Logged in", userData, token });
                }
                else {
                    res.status(500).json({ status: false, message: "User data is undefined" });
                }
            }
            else if (response?.blocked) {
                res.json({ blocked: true });
            }
            else {
                res.status(500).json({ status: false, message: "Login failed" });
            }
        }
        catch (error) {
            // Handle any errors that may occur during the execution
            console.error("Error during login:", error);
            res.status(500).json({ status: false, message: "Internal server error" });
        }
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
        const { phone } = req.body;
        const data = { phone };
        (0, userAuth_1.otpLogin)(data, dbUserRepository, authServices).then((response) => {
            if (response?.status === true) {
                const userData = response.userData;
                const token = response.token;
                res.json({ status: true, message: "User Logined", userData, token });
            }
            else {
                res.json({ status: false });
            }
        });
    });
    const findSuggest = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { userId } = req.params;
            const data = await (0, userDetails_1.suggestFriend)(userId, dbUserRepository);
            res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const putFollower = (0, express_async_handler_1.default)(async (req, res) => {
        console.log("folllllllllllllllllow");
        try {
            const { id } = req.body;
            const { userId } = req.params;
            const data = await (0, userDetails_1.addFollower)(id, userId, dbUserRepository);
            if (data) {
                res.json(data);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const putUnFollow = (0, express_async_handler_1.default)(async (req, res) => {
        console.log("unfollloolooo");
        try {
            const { id } = req.body;
            const { userId } = req.params;
            const data = await (0, userDetails_1.removeFollower)(id, userId, dbUserRepository);
            if (data)
                res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const getUserDetails = (0, express_async_handler_1.default)(async (req, res) => {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhha");
        try {
            const { userId } = req.params;
            const data = await (0, userAuth_1.getUserWithId)(userId, dbUserRepository);
            res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const checkExistingData = (0, express_async_handler_1.default)(async (req, res) => {
        const { username, phone, email } = req.body;
        console.log(req.headers);
        // Initialize the user object with default values
        const user = {
            username: '',
            email: '',
            phone: '',
        };
        // Check if data is provided and update the user object accordingly
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        if (phone)
            user.phone = phone.toString();
        const data = await (0, userAuth_1.ExistorNot)(user, dbUserRepository);
        console.log(data);
        if (data.status) {
            res.json({ status: true, message: 'Data does not exist' });
        }
        else {
            res.json({ status: false, message: data.message });
        }
    });
    const updateUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { username, email, phone, bio, location, profileUrl } = req.body;
        const { userId } = req.params;
        const userUpdate = await (0, userAuth_1.profileUpdate)(username, email, phone, bio, location, profileUrl, userId, dbUserRepository, authServices);
        console.log(userUpdate);
        res.json({ profileupdated: userUpdate });
    });
    return {
        registerUser,
        loginUser,
        loginWithGoogle,
        checkotpNumber,
        loginWithOtp,
        findSuggest,
        putFollower,
        putUnFollow,
        getUserDetails,
        checkExistingData,
        updateUser,
    };
};
exports.default = authController;
