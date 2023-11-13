import mongoose from "mongoose";
import Post from '../../models/usermodels/postModel'
import User from '../../models/usermodels/userModel'


export const postRepositoryMongoDb =()=>{
    const addPostDetails =async (
        userId:string,
        caption:string,
        fileUrl:string
    )=>{
        const post={
            userId:userId,
            description:caption,
            post:fileUrl
        };
        const newpost=new Post(post);
        return newpost.save()
    };
const getAllPosts = async()=>{
    const allPosts = await Post.find({});
    return allPosts;
};
const getPosts =async(userId:string)=>{
    const user:any =await User.findById(userId);
    const followingIds=user.following;
    followingIds.push(userId)
    const data=await Post.find({userId:{$in:followingIds}});
    return data;
}

const fetchUserPost = async (userId: string) => {
    const data = await Post.find({ userId: userId });
    return data;
  };


const fetchUsersData=async (userId:string)=>{
    const data=await User.findById(userId);

    console.log(data,"postuserssssssssss");
    
    return data
} ;

const postLike=async(postId:string,userId:string)=>{
    console.log(postId,userId);
    const data:any=await Post.updateOne(
        {_id:postId,likes:{$ne:userId}},
        {
            $addToSet:{
                likes:userId,
            },
        }
    );
    return true
};

const unLike = async (postId: string, userId: string) => {
    const data: any = await Post.updateOne(
      { _id: postId },
      {
        $pull: {
          likes: userId,
        },
      },
      {
        new: true,
      }
    );
    return true;
  };


    return {
        addPostDetails,
        getAllPosts,
        getPosts,
        fetchUserPost,
        fetchUsersData,
        postLike,
        unLike
    }
}


export type postRepositoryMongoDb = typeof postRepositoryMongoDb;
