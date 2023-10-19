import {Request,Response,response} from "express"
import asyncHandler from "express-async-handler";
import { userRepositoryMongoDB } from '../../../framework/database/mongodb/repositories/user/userAuthRepositoryImp';
import { AuthServiceInterface } from '../../../application/services/user/userAuthServiceInt';
import {AuthServices} from "../../../framework/services/user/userAuthServiceImp";
import {UserDbInterface,userDbRepository} from "../../../application/repositories/user/userRepositoryInf";
import {userRegister,userLogin,googleLogin,checkPhone,otpLogin} from "../../../application/useCase/user/auth/userAuth"

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
        console.log(user,'uuuuuuuuuuuse');
        console.log(user.userData?.isBlock,"blooooock");
        
    
                  if(user.status===true){

                    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh");
                    if(user.userData?.isBlock===true){
                        res.json({ blocked: true});
                    }else{
                        res.json({status:true,user});
                    }
                   
                  }else{
                    res.json({status:false})
                  }    
    });

    const loginWithGoogle=asyncHandler(async(req:Request,res:Response)=>{
      console.log(req.body,"emailllllllllllllllll");
      
        const { email } = req.body;
        const values = { email};
    
   googleLogin(values, dbUserRepository, authServices).then((response)=>{
console.log(response,"rrrrrrrrrrrrrsssssssssssss");

  
    if (response?.status===true) {
      res.json({ status: true, message: "User Logined", response });
    }
    else if(response?.blocked){
      res.json({blocked:true})
    } 
    else {
      res.json({ status: false });
    }
   })
   
    });

    const checkotpNumber=asyncHandler(async(req:Request,res:Response)=>{
        const {phone}=req.body
        const value = { phone};

       checkPhone(value,dbUserRepository).then((response)=>{
       
        if(response?.status===true){
                res.json({ status: true});
        }
        else if(response?.blocked===true){
           res.json({blocked:true})
        }
        
        else{
            res.json({status:false})
        }
       })
    });

    const loginWithOtp=asyncHandler(async(req:Request,res:Response)=>{

        
        console.log(req.body,"fffffffffffffffffffffffffffff");
        
      
        const { phone } = req.body;
        
        const data = { phone};
        console.log(data,"okkkkkkkkkkkkkkkkkkkkk");
        

        otpLogin(data,dbUserRepository, authServices).then((response)=>{
            if(response?.status===true){
                res.json({ status: true, message: "User Logined", response });
            }else {
                res.json({ status: false });
              }
        })

    })


    return{
        registerUser,
        loginUser,
        loginWithGoogle,
        checkotpNumber,
        loginWithOtp
    }
}
export default authController;