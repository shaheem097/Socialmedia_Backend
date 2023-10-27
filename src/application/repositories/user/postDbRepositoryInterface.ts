
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
    return{
        addPost,
        getAllPosts
    }
};



export type postDbInterface = typeof postRepository;