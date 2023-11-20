import { postEdit } from './../../useCase/user/auth/post';

import { postRepositoryMongoDb } from "../../../framework/database/mongodb/repositories/user/postRepositoryImp";

export const postRepository=(
    repository:ReturnType<postRepositoryMongoDb>
)=>{
    const addPost =async (
        userId:string,
        caption:string,
        fileUrl:string

    )=>{
        return repository.addPostDetails(userId,caption,fileUrl)
    };


const  getAllPosts = async () =>{
   return repository.getAllPosts()
}

const fetchPosts = async (userId:string) => {
    return repository.getPosts(userId);
  };

  const fetchUserPosts = async (userId: string) => {
    return repository.fetchUserPost(userId);
  };

const fetchUsersData=async (userId:string)=>{
    return repository.fetchUsersData(userId)
};
const likePost = async (postId: string, userId: string) => {
    return repository.postLike(postId, userId);
  };
  const unLikePost = async (postId: string, userId: string) => {
    return repository.unLike(postId, userId);
  };

  const addComment=async(
    postId:string,
    userId:string,
    comment:string,
    username:string,
    dp:string,
  )=>{
    return repository.putComment(postId,userId,comment,username,dp)
  };

  const deleteComment=async(
    postId:string,
    userId:string,
    index:number
  )=>{
    return repository.postDeleteComment(postId,userId,index)
  }


  const deletePost=async(postId:string)=>{
    return repository.postDelete(postId);
  }

  const editPost=async(postId:string,text:string)=>{
    
    return repository.postEdit(postId,text)
  }

  


    return{
        addPost,
        getAllPosts,
        fetchPosts,
        fetchUserPosts,
        fetchUsersData,
        likePost,
        unLikePost,
        addComment,
        deleteComment,
        deletePost,
        editPost

    }
};



export type postDbInterface = typeof postRepository;