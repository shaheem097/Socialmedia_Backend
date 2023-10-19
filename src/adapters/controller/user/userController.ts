import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserDbInterface} from "../../../application/repositories/user/userRepositoryInf";
import { userRepositoryMongoDB } from "../../../framework/database/mongodb/repositories/user/userAuthRepositoryImp";
import {getAllUsers,blockCurrUser,unBlockCurrUser} from "../../../application/useCase/user/auth/userDetails";

const userControllers=(
    userDbRepository:UserDbInterface,
    userDbRepositoryService:userRepositoryMongoDB
)=>{
    const dbRepositoryUser=userDbRepository(userDbRepositoryService());



    const getUsers=asyncHandler(async(req:Request,res:Response)=>{
        const data=await getAllUsers(dbRepositoryUser);
        res.json({data})
    });

    const blockUser=asyncHandler(async(req:Request,res:Response)=>{

        const {userId}=req.params;
        console.log(userId,"iiiiiiddddddddd");
        
        const status=await blockCurrUser(userId,dbRepositoryUser)

        console.log(status,"controllerrrrrr");
        res.json({status})
    })
    const unblockUser=asyncHandler(async(req:Request,res:Response)=>{
        const {userId}=req.params;
        const status=await unBlockCurrUser(userId,dbRepositoryUser)

        console.log(status,"un block controllerrrrrr");
        res.json({status})
    })


    return{
        getUsers,
        blockUser,
        unblockUser,
    }
}

export default userControllers;