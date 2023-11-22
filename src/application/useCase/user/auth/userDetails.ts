import { UserDbInterface,userDbRepository } from "../../../repositories/user/userRepositoryInf";

export const getAllUsers=async(
    userRepository:ReturnType<UserDbInterface>
)=>{
    try{
        const details=await userRepository.getAllUsers();
       return details;

    }catch(err)
{
    console.log(err,"error in use case");
    
}
};

export const blockCurrUser=async(
    userId:string,
    userRepository:ReturnType<UserDbInterface>
)=>{
    try {
        const status=await userRepository.blockCurrUser(userId)
    return status;
    } catch (error) {
        console.log(error);
        
    }
}

export const unBlockCurrUser = async (
    userId: string,
    userRepository: ReturnType<UserDbInterface>
  ) => {
    try {
      const status = await userRepository.unBlockCurrUser(userId);
      return status;
    } catch (error) {
      console.log(error);
    }
  };


export const suggestFriend=async(userId:string,userRepository:ReturnType<UserDbInterface>)=>{
    try{
        const data=await userRepository.findSuggest(userId)
        return data;
    }catch(error){
        console.log(error);
        
    }
};

export const addFollower=async(
    friendId:string,
    userId:string,
    userRepository:ReturnType<UserDbInterface>
)=>{
    try{
        
        const data=await userRepository.putFollower(friendId,userId)
        return data;
    }catch(error){
        console.log(error);
        
    }
}


export const removeFollower = async (
    friendId: string,
    userId: string,
    userRepository: ReturnType<UserDbInterface>
  ) => {
    try {
      const data = await userRepository.removeFollow(friendId, userId);
      return data;
    } catch (error) {
      console.log(error);
    }
  };



  export const getReportedPosts=async(userRepository:ReturnType<UserDbInterface>)=>{
    try {
        const data= await userRepository.getPostsReported();
        return data
    } catch (error) {
        console.log(error);
        
    }
  }


  export const removeReport = async(postId:string,id:string,userRepository:ReturnType<UserDbInterface>)=>{
      
      try {
      const data = await userRepository.reportRemove(postId,id);
      return data
    } catch (error) {
      console.log(error);
    }
  }

  export const reportConfirm = async(postId:string,userRepository:ReturnType<UserDbInterface>)=>{
    try {
       const data = await userRepository.confirmReport(postId)
        return data
    } catch (error) {
      console.log(error);
    }
  }