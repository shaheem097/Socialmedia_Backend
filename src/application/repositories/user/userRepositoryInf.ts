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

  const getUserIdProfile = async(userId:string)=>{
    return repository.getUserWidget(userId)
   }

   const updateUser=async(
    username:string,
    email:string,
    phone:number,
    bio:string,
    location:string,
    profileUrl:string,
    userId:string
   )=>{
    return repository.updateUserData(
      username,
      email,
      phone,
      bio,
      location,
      profileUrl,
      userId
    )
   }

   const getPostsReported = async()=>{
    return repository.getReportedPosts()
  }

  const reportRemove = async(postId:string,id:string)=>{
    return repository.removeReport(postId,id)
  }

  const confirmReport = async(postId:string)=>{
    return repository.reportConfirm(postId)
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
    removeFollow,
    getUserIdProfile,
    updateUser,
    getPostsReported,
    reportRemove,
    confirmReport
   
    };
    
}
export type UserDbInterface=typeof userDbRepository;