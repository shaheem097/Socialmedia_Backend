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

  
const putComment=async(
    postId:string,
    userId:string,
    comment:string,
    username:string,
    dp:string,
)=>{
    const newId=postId.replace(/:/g,"")
    try {
      
        const post=await Post.findByIdAndUpdate(
            {_id:newId},
            {$push:{ comments:{userId:userId,comment:comment,username:username,dp:dp}}},
             
            {new:true}
            );    
         
            
        return post;
    } catch (error) {
        console.log(error);
        
    }
};

const postDeleteComment=async(
    postId:string,
    userId:string,
    index:number
)=>{
    
    const newId=postId.replace(/:/g, "");
    try {
        const post=await Post.findById(newId)
        if(!post){
            return
        }
        post.comments.splice(index,1);
        await post.save();
        
        return post

    } catch (error) {
        console.log(error);
        
    }
}

const postDelete = async(postId:string)=>{
    try {
        await Post.deleteOne({_id:postId});
        return true
    } catch (error) {
        console.log(error);
    }
}


const postEdit=async(postId:string,text:string)=>{
    try {
        await Post.updateOne(
            {_id:postId},
            {
                $set:{
                    description:text,
                },
            }
        ).then((res)=>{
            console.log(res,"editpost");
            
            return true
        })
    } catch (error) {
        console.log(error);
        
    }
}


const addReport=async(postId:string,userId:string,reason:string)=>{
    try {
        const newId=postId.replace(/:/g,"");
        const post =await Post.findById(newId)


        if(post){
            const isUserReported=post?.report?.some((report)=>report?.userId===userId)

            if(!isUserReported){
                post?.report?.push({userId:userId,reason:reason})
                const updatedPost=await post.save()
                return updatedPost
            }else{

                return false
            }
        }else{
            return false
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}



    return {
        addPostDetails,
        getAllPosts,
        getPosts,
        fetchUserPost,
        fetchUsersData,
        postLike,
        unLike,
        putComment,
        postDeleteComment,
        postDelete,
        postEdit,
        addReport
    }
};

export type postRepositoryMongoDb = typeof postRepositoryMongoDb;
