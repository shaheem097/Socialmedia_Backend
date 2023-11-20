import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { postDbInterface, postRepository } from "../../../application/repositories/user/postDbRepositoryInterface";
import { postRepositoryMongoDb } from "../../../framework/database/mongodb/repositories/user/postRepositoryImp";
import {getAllPosts,postData,dataUserPosts,postUsersData,
        putData,putLike,putUnLike,
        putComment,deletePostComment,
        postDelete,postEdit} from "../../../application/useCase/user/auth/post"

const postControllers = (
    postDbRepository: postDbInterface,
    postDbRepositoryService: postRepositoryMongoDb
  ) => {
    const postRepository = postDbRepository(postDbRepositoryService());

const addPost = asyncHandler(async (req: Request, res: Response) => {
    
    
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
    const {userId,comment,username,dp}=req.body;
    const data=await putComment(postId,userId,comment,username,dp,postRepository)
    res.json(data);

  } catch (error) {
    console.log(error);
    
  }
});

const deleteComment=asyncHandler(async(req:Request,res:Response)=>{
  try{
    const {postId}=req.params;
    const {userId,index}=req.body;
    const data=await deletePostComment(
      postId,
      userId,
      index,
      postRepository
    );
    res.json(data)
  }catch(error){
    console.log(error);
    
  }
});

const deletePost =asyncHandler(async(req:Request,res:Response)=>{
  const {postId}=req.params;
  await postDelete(postId,postRepository);
  res.json({status:true})
})

const editPost=asyncHandler(async(req:Request,res:Response)=>{
 
  
  try {
    const {postId}=req.params;
    const {text}=req.body;
    const data=await postEdit(postId,text,postRepository);
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
    addComment,
    deleteComment,
    deletePost,
    editPost

  };

  }
  export default postControllers;