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
}
    return {
        addPostDetails,
        getAllPosts
    }
}


export type postRepositoryMongoDb = typeof postRepositoryMongoDb;
