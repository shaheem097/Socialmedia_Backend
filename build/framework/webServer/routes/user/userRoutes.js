"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRepositoryInf_1 = require("../../../../application/repositories/user/userRepositoryInf");
const userAuthRepositoryImp_1 = require("../../../database/mongodb/repositories/user/userAuthRepositoryImp");
const userAuthServiceInt_1 = require("../../../../application/services/user/userAuthServiceInt");
const userAuthServiceImp_1 = require("../../../services/user/userAuthServiceImp");
const userAuthControllers_1 = __importDefault(require("../../../../adapters/controller/user/userAuthControllers"));
const authenticateToken = require('../../middlewares/userAuthenticateToken');
// const authenticateToken=require('jwt-verify-token')
const authRouter = () => {
    const router = express_1.default.Router();
    const controllers = (0, userAuthControllers_1.default)(userAuthServiceInt_1.AuthServiceInterface, userAuthServiceImp_1.authServices, userRepositoryInf_1.userDbRepository, userAuthRepositoryImp_1.userRepositoryMongoDB);
    router.post("/signup", controllers.registerUser);
    router.post("/login", controllers.loginUser);
    router.post("/google", controllers.loginWithGoogle);
    router.post("/checkPhoneNumber", controllers.checkotpNumber);
    router.post('/otpLogin', controllers.loginWithOtp);
    router.get('/find-suggest/:userId', authenticateToken, controllers.findSuggest);
    router.put('/:userId/follow', authenticateToken, controllers.putFollower);
    router.put('/:userId/unFollow', authenticateToken, controllers.putUnFollow);
    router.get("/:userId/user", authenticateToken, controllers.getUserDetails);
    router.post('/checkExistingData', authenticateToken, controllers.checkExistingData);
    router.post('/checkPhoneExisting', controllers.checkExistingData);
    router.put('/:userId/profileUpdate', authenticateToken, controllers.updateUser);
    return router;
};
exports.default = authRouter;
