import express,{Router} from "express";
import {userDbRepository} from "../../../../application/repositories/user/userRepositoryInf";
import {userRepositoryMongoDB}  from "../../../database/mongodb/repositories/user/userAuthRepositoryImp";
import {AuthServiceInterface}  from "../../../../application/services/user/userAuthServiceInt";
import {authServices} from "../../../services/user/userAuthServiceImp";
import authController from "../../../../adapters/controller/user/userAuthControllers"

const  authRouter=():Router => {
    const router=express.Router();
    const controllers=authController(
        AuthServiceInterface,
        authServices,
        userDbRepository,
        userRepositoryMongoDB
    );
    router.post("/signup",controllers.registerUser);
    
    router.post("/login",controllers.loginUser)
    
    router.post("/google", controllers.loginWithGoogle);

    router.post("/checkPhoneNumber", controllers.checkotpNumber);

    router.post('/otpLogin',controllers.loginWithOtp)

    router.get('/find-suggest/:userId',controllers.findSuggest)
    
    router.put('/:userId/follow',controllers.putFollower)

    router.put('/:userId/unFollow',controllers.putUnFollow)

    router.get("/:userId/user", controllers.getUserDetails);

    router.post('/checkExistingData',controllers.checkExistingData)

    router.put('/:userId/profileUpdate',controllers.updateUser)
    return router
}


export default authRouter