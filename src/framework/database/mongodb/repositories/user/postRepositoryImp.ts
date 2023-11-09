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
}  

    return {
        addPostDetails,
        getAllPosts,
        getPosts,
        fetchUserPost,
        fetchUsersData
    }
}


export type postRepositoryMongoDb = typeof postRepositoryMongoDb;
