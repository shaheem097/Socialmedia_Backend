"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileUpdate = exports.ExistorNot = exports.getUserWithId = exports.otpLogin = exports.checkPhone = exports.googleLogin = exports.userLogin = exports.userRegister = void 0;
const userRegister = async (user, userRepository, authService) => {
    user.email = user.email.toLocaleLowerCase();
    user.phone = user.phone;
    user.username = user.username;
    const isUserNameExist = await userRepository.getUserByName(user.username);
    const isEmailExist = await userRepository.getUserByEmail(user.email);
    const isPhoneExist = await userRepository.getUserByPhone(user.phone);
    if (isEmailExist && isPhoneExist && isUserNameExist) {
        return { status: false, message: "Username,Email & Phonenumber Allready Exist" };
    }
    else if (isEmailExist && isPhoneExist) {
        return { status: false, message: "Email & Phonenumber Allready Exist" };
    }
    else if (isUserNameExist && isEmailExist) {
        return { status: false, message: "Username & Email Allready Exist" };
    }
    else if (isUserNameExist && isPhoneExist) {
        return { status: false, message: "Username & Phone Allready Exist" };
    }
    else if (isUserNameExist) {
        return { status: false, message: "Username Allready Exist" };
    }
    else if (isEmailExist) {
        return { status: false, message: "Email Allready Exist" };
    }
    else if (isPhoneExist) {
        return { status: false, message: "Phone number Allready Exist" };
    }
    else {
        let encryptPassword = await authService.encryptPassword(user.password);
        user.password = encryptPassword;
        const response = await userRepository.addUser(user);
        const userdetails = response;
        let userId = response._id;
        let UserName = response.username;
        const token = await authService.generateToken(userId.toString(), UserName);
        console.log(token);
        const userData = {
            token,
            userId,
            UserName
        };
        return { status: true, userData };
    }
};
exports.userRegister = userRegister;
const userLogin = async (user, userRepository, authService) => {
    let userExist = await userRepository.getUserValid(user.email);
    const userDetails = userExist;
    console.log(userExist, "logindataaaaaaaaaaaaaaaa");
    if (!userExist) {
        return { status: false };
    }
    let checkPassword = await authService.comparePassword(user.password, userExist.password);
    const token = await authService.generateToken(userExist._id, userExist.username);
    const userData = {
        token,
        isBlock: userExist.isBlock,
        userId: userExist._id,
        UserName: userExist.username,
        dp: userExist?.dp,
        bio: userExist?.bio,
        location: userExist?.location,
        followers: userExist?.followers,
        following: userExist?.following,
    };
    if (checkPassword) {
        return { status: true, userData };
    }
    else {
        return { status: false };
    }
};
exports.userLogin = userLogin;
const googleLogin = async (user, userRepository, authService) => {
    // user.email = user.email.toLowerCase();
    const isEmailExist = await userRepository.getUserByEmail(user.email);
    const isBlockorNot = isEmailExist.isBlock;
    if (isEmailExist && !isBlockorNot) {
        const userId = isEmailExist._id;
        const username = isEmailExist.username;
        const token = await authService.generateToken(userId.toString(), username);
        const userData = {
            userId: userId,
            UserName: isEmailExist.username,
            dp: isEmailExist?.dp,
            bio: isEmailExist?.bio,
            location: isEmailExist?.location,
            followers: isEmailExist?.followers,
            following: isEmailExist?.following,
            token: token
        };
        return { status: true, userData };
    }
    else if (isBlockorNot === true) {
        return { blocked: true };
    }
    else {
        return { status: false };
    }
};
exports.googleLogin = googleLogin;
const checkPhone = async (user, userRepository) => {
    const isPhoneExist = await userRepository.getUserByPhone(user.phone);
    if (isPhoneExist) {
        const isBlock = isPhoneExist.isBlock;
        if (isBlock === true) {
            return { blocked: true };
        }
        else {
            return { status: true };
        }
    }
    return { status: false };
};
exports.checkPhone = checkPhone;
const otpLogin = async (user, userRepository, authService) => {
    const isPhoneExist = await userRepository.getUserByPhone(user.phone);
    if (isPhoneExist) {
        const userId = isPhoneExist._id;
        const username = isPhoneExist.username;
        const token = await authService.generateToken(userId.toString(), username);
        const userData = {
            token: token,
            userId: userId,
            UserName: isPhoneExist.username,
            dp: isPhoneExist?.dp,
            bio: isPhoneExist?.bio,
            location: isPhoneExist?.location,
            followers: isPhoneExist?.followers,
            following: isPhoneExist?.following,
        };
        return { status: true, userData };
    }
};
exports.otpLogin = otpLogin;
const getUserWithId = async (userId, userRepository) => {
    try {
        const data = await userRepository.getUserIdProfile(userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUserWithId = getUserWithId;
const ExistorNot = async (user, userRepository) => {
    // Convert email and phone to lowercase if they exist
    if (user.email)
        user.email = user.email.toLowerCase();
    const { username, email, phone } = user;
    const isUserNameExist = username ? await userRepository.getUserByName(username) : null;
    const isEmailExist = email ? await userRepository.getUserByEmail(email) : null;
    const isPhoneExist = phone ? await userRepository.getUserByPhone(phone) : null;
    if (isEmailExist && isPhoneExist && isUserNameExist) {
        return { status: false, message: "Username, Email & Phone Number Already Exist" };
    }
    else if (isEmailExist && isPhoneExist) {
        return { status: false, message: "Email & Phone Number Already Exist" };
    }
    else if (isUserNameExist && isEmailExist) {
        return { status: false, message: "Username & Email Already Exist" };
    }
    else if (isUserNameExist && isPhoneExist) {
        return { status: false, message: "Username & Phone Number Already Exist" };
    }
    else if (isUserNameExist) {
        return { status: false, message: "Username Already Exist" };
    }
    else if (isEmailExist) {
        return { status: false, message: "Email Already Exist" };
    }
    else if (isPhoneExist) {
        return { status: false, message: "Phone Number Already Exist" };
    }
    else {
        return { status: true, message: "Data does not exist" };
    }
};
exports.ExistorNot = ExistorNot;
const profileUpdate = async (username, email, phone, bio, location, profileUrl, userId, userRepository, authService) => {
    const updateUser = await userRepository.updateUser(username, email, phone, bio, location, profileUrl, userId);
    return updateUser;
};
exports.profileUpdate = profileUpdate;
