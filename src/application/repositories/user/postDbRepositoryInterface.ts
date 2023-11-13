
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

    return{
        addPost,
        getAllPosts,
        fetchPosts,
        fetchUserPosts,
        fetchUsersData,
        likePost,
        unLikePost

    }
};



export type postDbInterface = typeof postRepository;