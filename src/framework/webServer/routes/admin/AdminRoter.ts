import express from "express"
import adminAuthController from "../../../../adapters/controller/admin/adminAuthController"
import { AdminAuthServiceInterface } from "../../../../application/services/admin/adminAuthServiceInt";
import { adminAuthServices } from "../../../services/admin/adminAuthServiceImp";
import { adminDbRepository } from "../../../../application/repositories/admin/adminRepositoryInf";
import { adminRepositoryMongodb } from "../../../database/mongodb/repositories/admin/adminAuthRepository";
import { userDbRepository } from "../../../../application/repositories/user/userRepositoryInf";
import { userRepositoryMongoDB } from "../../../database/mongodb/repositories/user/userAuthRepositoryImp";
import userControllers from '../../../../adapters/controller/user/userController'
const adminauthenticateToken = require('../../middlewares/adminAuthenticateToken')

const adminAuthRouter=()=>{
    const router=express.Router();
    const adminControllers=adminAuthController(
        AdminAuthServiceInterface,
        adminAuthServices,
        adminDbRepository,
        adminRepositoryMongodb
    );

    const controllers = userControllers(userDbRepository, userRepositoryMongoDB);

    router.post("/login",adminControllers.loginAdmin)

    router.get("/view-users",adminauthenticateToken,controllers.getUsers)

    router.put('/block/:userId',adminauthenticateToken,controllers.blockUser)

    router.put('/unblock/:userId',adminauthenticateToken,controllers.unblockUser)

    router.get('/reported-posts',adminauthenticateToken,controllers.reportedPosts)

    router.put("/reported-remove", controllers.reportRemove);

    router.put('/confirm-report/:postId',controllers.confirmReport)

    return router
};
export default  adminAuthRouter