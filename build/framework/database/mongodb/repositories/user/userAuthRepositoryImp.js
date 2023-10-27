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
    const getAllUsers = async () => {
        const users = await userModel_1.default.find();
        return users;
    };
    const blockCurrUser = async (userId) => {
        const status = await userModel_1.default.findOneAndUpdate({ _id: userId }, { $set: { isBlock: true } }, { new: true });
        return status;
    };
    const unBlockCurrUser = async (userId) => {
        const status = await userModel_1.default.findOneAndUpdate({ _id: userId }, { $set: { isBlock: false } }, { new: true });
        return status;
    };
    const suggestionUser = async (userId) => {
        try {
            const data = await userModel_1.default.findById(userId);
            const followingIds = data.following;
            const remainingdata = await userModel_1.default.find({
                $and: [{ _id: { $nin: followingIds } }, { _id: { $ne: userId } }],
            }).exec();
            return remainingdata;
        }
        catch (error) {
            console.log(error);
        }
    };
    const addFollower = async (friendId, userId) => {
        console.log(friendId, userId);
        try {
            const data = await userModel_1.default.findByIdAndUpdate({ _id: friendId, followers: { $ne: userId } }, {
                $addToSet: {
                    followers: userId,
                },
            }, {
                new: true,
            });
            const details = await userModel_1.default.findByIdAndUpdate({ _id: userId, following: { $ne: friendId } }, {
                $addToSet: {
                    following: friendId
                },
            }, {
                new: true,
            });
            return { data, details };
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
        getUserByName,
        getAllUsers,
        blockCurrUser,
        unBlockCurrUser,
        suggestionUser,
        addFollower,
    };
};
exports.userRepositoryMongoDB = userRepositoryMongoDB;
