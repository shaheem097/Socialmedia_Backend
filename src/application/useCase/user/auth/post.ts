import { postRepository } from './../../../repositories/user/postDbRepositoryInterface';

import { getAllUsers } from './userDetails';
import { postDbInterface } from "../../../repositories/user/postDbRepositoryInterface";

export const putData=async(
    userId:string,
    caption:string,
    fileUrl:string,
    postDbRepository:ReturnType<postDbInterface>
)=>{
    const data:any =await postDbRepository.addPost(
        userId,
        caption,
        fileUrl
    );
    return data;
};

export const getAllPosts = async (
    postDbRepository:ReturnType<postDbInterface>
)=>{
  const data:any = await postDbRepository.getAllPosts()

  
  return data
};


export const postData=async (userId:string,postDbRepository:ReturnType<postDbInterface>
    )=>{
        const data:any =await postDbRepository.fetchPosts(userId);
        return data
    };

export const dataUserPosts = async (
  userId: string,
  postDbRepository: ReturnType<postDbInterface>
) => {
  const data: any = await postDbRepository.fetchUserPosts(userId);
  return data;
};    

export const postUsersData=async (
    userId:string,
    postDbRepository:ReturnType<postDbInterface>
)=>{
    const usersData:any =await postDbRepository.fetchUsersData(userId);
    return usersData;
};

export const putLike=async(
    postId:string,
    userId:string,
    postDbRepository:ReturnType<postDbInterface>
)=>{
    try {
        const data = await postDbRepository.likePost(postId, userId);
        return data;
      } catch (error) {
        console.log(error);
      }
};

export const putUnLike = async (
    postId: string,
    userId: string,
    postDbRepository: ReturnType<postDbInterface>
  ) => {
    try {
      const data = await postDbRepository.unLikePost(postId, userId);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  export const putComment=async(
    postId:string,
    userId:string,
    comment:string,
    username:string,
    dp:string,
    postDbRepository:ReturnType<postDbInterface>
  )=>{
   
    try {
       
        const data=await postDbRepository.addComment(postId,userId,comment,username,dp)
        return data;
    } catch (error) {
        console.log(error);
        
    }
  };

  export const deletePostComment=async(
    postId:string,
    userId:string,
    index:number,
    postDbRepository:ReturnType<postDbInterface>
  )=>{
    try {
        const data=await postDbRepository.deleteComment(postId,userId,index);
        return data;
    } catch (error) {
        console.log(error);
        
    }
  };

  export const postDelete=async(
    postId:string,
    postDbRepository:ReturnType<postDbInterface>
  )=>{
    const data:any=await postDbRepository.deletePost(postId)
    return data;
  }


  export const postEdit=async(

    postId:string,
    text:string,
    postDbRepository:ReturnType<postDbInterface>
  )=>{
    
    await postDbRepository.editPost(postId,text)
    return true
  }

  export const addReport=async(postId:string,userId:string,reason:string,
    postDbRepository:ReturnType<postDbInterface>
    )=>{
      try {
        const data=await postDbRepository.reportPost(postId,userId,reason)
        return data
      } catch (error) {
        console.log(error);
        
      }
    }