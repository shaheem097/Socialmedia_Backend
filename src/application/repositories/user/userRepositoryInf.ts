import { userRepositoryMongoDB } from '../../../framework/database/mongodb/repositories/user/userAuthRepositoryImp';
import {modelNames} from "mongoose"


export const userDbRepository=(
    repository:ReturnType<userRepositoryMongoDB>
)=>{
    const addUser=async(user:{
       
        username?:string;
        phone?:number;
        email?:string;
        password?:string;
    })=>{
        return await repository.addUser(user);
    };
    const getUserByEmail=async(email:string)=>{
        return repository.getUserByEmail(email);
    }
    const getUserByPhone=async(phone:number)=>{
        return repository.getUserByPhone(phone);
    }

   
    const getUserByName=async(username:string)=>{
        return repository.getUserByName(username);
    }
    
    const getUserValid=async(email:string)=>{
        return repository.getUserValid(email);
    };
    
   const getAllUsers=async()=>{
    return repository.getAllUsers()
   }

   const blockCurrUser = async (userId: string) => {
    return repository.blockCurrUser(userId);
  };
  const unBlockCurrUser = async (userId: string) => {
    return repository.unBlockCurrUser(userId);
  };

  const findSuggest=async(userId:string)=>{
    return repository.suggestionUser(userId)
  }

  const putFollower = async(friendId:string,userId:string)=>{
    return repository.addFollower(friendId,userId)
  }

  const removeFollow = async(friendId:string,userId:string)=>{
    return repository.removeFollower(friendId,userId)
  }

    return{
    addUser,
    getUserByEmail,
    getUserValid,
    getUserByPhone,
    getUserByName,
    getAllUsers,
    blockCurrUser,
    unBlockCurrUser,
    findSuggest,
    putFollower,
    removeFollow
   
    };
    
}
export type UserDbInterface=typeof userDbRepository;