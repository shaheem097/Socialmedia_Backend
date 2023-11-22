import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserDbInterface} from "../../../application/repositories/user/userRepositoryInf";
import { userRepositoryMongoDB } from "../../../framework/database/mongodb/repositories/user/userAuthRepositoryImp";
import {getAllUsers,blockCurrUser,unBlockCurrUser,getReportedPosts,removeReport,reportConfirm} from "../../../application/useCase/user/auth/userDetails";

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
    });

    const reportedPosts=asyncHandler(async(req:Request,res:Response)=>{
        try {
            const data=await getReportedPosts(dbRepositoryUser);
            res.json(data)
        } catch (error) {
            console.log(error);
            
        }
    });

    const reportRemove = asyncHandler(async (req: Request, res: Response) => {
        try {
          const { postId, id } = req.body;
          
          const data = await removeReport(postId, id, dbRepositoryUser);
          if (data) {
            res.json({ status: true });
          }
        } catch (error) {
          console.log(error);
        }
      });

      const confirmReport = asyncHandler(async(req:Request,res:Response)=>{
        try {
          const {postId} = req.params
           const data = await reportConfirm(postId,dbRepositoryUser)
           res.json({status:true})
        } catch (error) {
          console.log(error);
        }
      })
    

    return{
        getUsers,
        blockUser,
        unblockUser,
        reportedPosts,
        reportRemove,
        confirmReport

    }
}

export default userControllers;