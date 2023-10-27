
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
}