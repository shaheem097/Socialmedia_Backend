import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { postDbInterface } from "../../../application/repositories/user/postDbRepositoryInterface";
import { postRepositoryMongoDb } from "../../../framework/database/mongodb/repositories/user/postRepositoryImp";
import {getAllPosts,postData,dataUserPosts,postUsersData,
        putData,putLike,putUnLike,
        putComment} from "../../../application/useCase/user/auth/post"

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


const fetchPosts=async(req:Request,res:Response)=>{
  const {userId}=req.params;

  const data=await postData(userId,postRepository)
  res.json(data);
}

const fetchUserPosts = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data = await dataUserPosts(userId, postRepository);
  res.json(data);
});

const getUsersData=asyncHandler(async(req:Request,res:Response)=>{
  const {userId}=req.params;
  const data=await postUsersData(userId,postRepository);
  res.json(data);
});


const likedPost=asyncHandler(async(req:Request,res:Response)=>{
  console.log('like');
  
  try{
    const {userId}=req.body;
    const {postId}=req.params;
    const data=await putLike(postId,userId,postRepository)
    if(data) res.json(data);
  }catch(error){
    console.log(error);
    
  }
});

const unLikePost = asyncHandler(async (req: Request, res: Response) => {
  console.log('Un like');
  try {
    const { userId } = req.body;
    console.log(req.body);
    const { postId } = req.params;
    const data = await putUnLike(postId, userId, postRepository);
    if (data) res.json(data);
  } catch (error) {
    console.log(error);
  }
});

const addComment=asyncHandler(async(req:Request,res:Response)=>{
  try {
    
    
    const {postId}=req.params;
    const {userId,comment,username}=req.body;
    const data=await putComment(postId,userId,comment,username,postRepository)
    res.json(data);

  } catch (error) {
    console.log(error);
    
  }
})

  return{
    addPost,
    getAllPost,
    fetchPosts,
    fetchUserPosts,
    getUsersData,
    likedPost,
    unLikePost,
    addComment

  };

  }
  export default postControllers;