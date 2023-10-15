import {Request,Response,response} from "express"
import asyncHandler from "express-async-handler";
import { userRepositoryMongoDB } from '../../../framework/database/mongodb/repositories/user/userAuthRepositoryImp';
import { AuthServiceInterface } from '../../../application/services/user/userAuthServiceInt';
import {AuthServices} from "../../../framework/services/user/userAuthServiceImp";
import {UserDbInterface,userDbRepository} from "../../../application/repositories/user/userRepositoryInf";
import {userRegister,userLogin,addUser} from "../../../application/useCase/user/auth/userAuth"

const authController=(
    authServiceInterface:AuthServiceInterface,
    authService:AuthServices,
    UserDbInterface:UserDbInterface,
    userDbservice:userRepositoryMongoDB

)=>{
    const dbUserRepository=UserDbInterface(userDbservice())
    const authServices=authServiceInterface(authService())


    const registerUser=asyncHandler(async(req:Request,res:Response)=>{
        console.log(req.body,"its cominggggggggggg");
        
        const {username,phone,email,password}=req.body
        const user={
            username,
            phone,
            email,
            password,
        };
      
      
        const token = await userRegister(user,dbUserRepository,authServices)
        console.log(token);
        if(token.status==true){
            res.json({status:true,message:"User registerd",token})
        }else{
            res.json({status:false,token})
        }
        
    });

    const loginUser=asyncHandler(async(req:Request,res:Response)=>{
    
        const {email,password}=req.body;
        const userDetails={email,password};
        const user=await userLogin(userDetails,dbUserRepository,authServices)
        // if(user.status){
        //     const {userExist}=user;
        //     const {token}=user;
        //     if(userExist.isBlock){
        //         res.json({blocked:"Blocked by admin"})
                  
                  if(user.status===true){
                    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh");
                    
                    res.json({status:true,user});
                  }else{
                    res.json({status:false})
                  }    
    });
    const googleUser=asyncHandler(async(req:Request,res:Response)=>{
        console.log("vannuuuuuuuuuuuuuuuuuuuuuuuuu");
        
        const { email } = req.body;
    console.log(req.body);
    const values = { email};
    
   addUser(values, dbUserRepository, authServices).then((response)=>{
    console.log(response,"controleriiiiiiiiiiiii");
    if (response?.status===true) {
      res.json({ status: true, message: "User registered", response });
    } else {
      res.json({ status: false });
    }
   })
   
    })


    return{
        registerUser,
        loginUser,
        googleUser,
    }
}
export default authController;