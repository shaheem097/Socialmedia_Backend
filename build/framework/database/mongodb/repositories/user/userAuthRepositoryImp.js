"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryMongoDB = void 0;
const userModel_1 = __importDefault(require("../../models/usermodels/userModel"));
const userRepositoryMongoDB = () => {
    const addUser = async (user) => {
        const newUser = new userModel_1.default(user);
        return await newUser.save();
    };
    const getUserByEmail = async (email) => {
        console.log(email, "email varunnund");
        const user = await userModel_1.default.findOne({ email: email });
        console.log(user, "ddddddddddddddddddddddfffffffffffffffffff");
        return user;
    };
    const getUserByPhone = async (phone) => {
        // console.log(phone,"phone varunnund");
        const user = await userModel_1.default.findOne({ phone: phone });
        return user;
    };
    const getUserByName = async (username) => {
        console.log(username, "username varunnund");
        const user = await userModel_1.default.findOne({ username: username });
        return user;
    };
    const getUserValid = async (email) => {
        const user = await userModel_1.default.findOne({ email: email });
        return user;
    };
    const newUserGoogle = async (user) => {
        console.log(user, "gsdfghsdgfhgsdghjfgdshjfghdsjghsfdghjsdgfshdgfhjgfhegjhfdsjhgdj");
        const { email, displayName, photoURL } = user;
        try {
            const newUser = new userModel_1.default({
                email: email,
                username: displayName,
                dp: photoURL,
            });
            return await newUser.save();
        }
        catch (error) {
            console.log(error);
        }
    };
    return {
        addUser,
        getUserByEmail,
        getUserValid,
        newUserGoogle,
        getUserByPhone,
        getUserByName
    };
};
exports.userRepositoryMongoDB = userRepositoryMongoDB;
