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
    
   



    return{
    addUser,
    getUserByEmail,
    getUserValid,
    getUserByPhone,
    getUserByName
    };
    
}
export type UserDbInterface=typeof userDbRepository;