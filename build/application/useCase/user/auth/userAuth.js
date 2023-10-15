"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpLogin = exports.checkPhone = exports.googleLogin = exports.userLogin = exports.userRegister = void 0;
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
        console.log("workingggggggggggggggggggggggg");
        let encryptPassword = await authService.encryptPassword(user.password);
        user.password = encryptPassword;
        const response = await userRepository.addUser(user);
        console.log(response, "PPPPPPPPPPPPPPPPPPPPPPPPPPPP");
        let userId = response._id;
        let UserName = response.username;
        const token = await authService.generateToken(userId.toString());
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
    if (!userExist) {
        return { status: false };
    }
    let checkPassword = await authService.comparePassword(user.password, userExist.password);
    const token = await authService.generateToken("1234567890".toString());
    const userData = {
        token,
        userId: userExist._id,
        UserName: userExist.username,
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
    if (isEmailExist) {
        const userId = isEmailExist._id;
        const token = await authService.generateToken(userId.toString());
        console.log(token, "tpken in usecase ethiiiii m,akkaleeeeeeeeeee");
        const userData = {
            userId: userId,
            UserName: isEmailExist.username,
            token: token
        };
        return { status: true, userData };
    }
};
exports.googleLogin = googleLogin;
const checkPhone = async (user, userRepository) => {
    console.log(user.phone, "checkkkkkkkkkkkkkk");
    const isPhoneExist = await userRepository.getUserByPhone(user.phone);
    if (isPhoneExist) {
        return { status: true };
    }
};
exports.checkPhone = checkPhone;
const otpLogin = async (user, userRepository, authService) => {
    console.log(user.phone, "loooooooooginnnnnnnnnnnusec");
    const isPhoneExist = await userRepository.getUserByPhone(user.phone);
    if (isPhoneExist) {
        const userId = isPhoneExist._id;
        const token = await authService.generateToken(userId.toString());
        console.log(token, "tokken vanneeeeeeeeeeee");
        const userData = {
            userId: userId,
            UserName: isPhoneExist.username,
            token: token
        };
        return { status: true, userData };
    }
};
exports.otpLogin = otpLogin;
