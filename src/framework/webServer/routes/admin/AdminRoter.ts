import express from "express"
import adminAuthController from "../../../../adapters/controller/admin/adminAuthController"
import { AdminAuthServiceInterface } from "../../../../application/services/admin/adminAuthServiceInt";
import { adminAuthServices } from "../../../services/admin/adminAuthServiceImp";
import { adminDbRepository } from "../../../../application/repositories/admin/adminRepositoryInf";
import { adminRepositoryMongodb } from "../../../database/mongodb/repositories/admin/adminAuthRepository";
import { userDbRepository } from "../../../../application/repositories/user/userRepositoryInf";
import { userRepositoryMongoDB } from "../../../database/mongodb/repositories/user/userAuthRepositoryImp";
import userControllers from '../../../../adapters/controller/user/userController'

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

    router.post("/view-users",controllers.getUsers)

    return router
};
export default  adminAuthRouter