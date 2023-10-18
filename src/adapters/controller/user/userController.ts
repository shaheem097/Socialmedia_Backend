import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserDbInterface} from "../../../application/repositories/user/userRepositoryInf";
import { userRepositoryMongoDB } from "../../../framework/database/mongodb/repositories/user/userAuthRepositoryImp";
import {getAllUsers} from "../../../application/useCase/user/auth/userDetails";

const userControllers=(
    userDbRepository:UserDbInterface,
    userDbRepositoryService:userRepositoryMongoDB
)=>{
    const dbRepositoryUser=userDbRepository(userDbRepositoryService());



    const getUsers=asyncHandler(async(req:Request,res:Response)=>{
        const data=await getAllUsers(dbRepositoryUser);
        res.json({data})
    })

    return{
        getUsers
    }
}

export default userControllers;