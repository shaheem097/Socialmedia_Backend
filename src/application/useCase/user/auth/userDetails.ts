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