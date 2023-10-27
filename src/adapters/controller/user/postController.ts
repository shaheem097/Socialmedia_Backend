import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { postDbInterface } from "../../../application/repositories/user/postDbRepositoryInterface";
import { postRepositoryMongoDb } from "../../../framework/database/mongodb/repositories/user/postRepositoryImp";
import {putData} from  '../../../application/useCase/user/auth/post'
import {getAllPosts} from "../../../application/useCase/user/auth/post"

const postControllers = (
    postDbRepository: postDbInterface,
    postDbRepositoryService: postRepositoryMongoDb
  ) => {
    const postRepository = postDbRepository(postDbRepositoryService());

const addPost = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body,"vannnnnnnnnnnnnnnnnnu");
    
    const { caption, fileUrl} = req.body;
    if (!fileUrl) {
      return;
    }
    const { userId } = req.params;
    const data = await putData(userId, caption,fileUrl, postRepository);
    res.json(data);
  });
const getAllPost =async (req:Request,res:Response)=>{
    const response = await getAllPosts(postRepository)
   
    res.json(response)
}
  return{
    addPost,
    getAllPost
  };

  }
  export default postControllers;