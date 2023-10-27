import {Request,Response,response} from "express"
import asyncHandler from "express-async-handler";
import { userRepositoryMongoDB } from '../../../framework/database/mongodb/repositories/user/userAuthRepositoryImp';
import { AuthServiceInterface } from '../../../application/services/user/userAuthServiceInt';
import {AuthServices} from "../../../framework/services/user/userAuthServiceImp";
import {UserDbInterface,userDbRepository} from "../../../application/repositories/user/userRepositoryInf";
import {userRegister,userLogin,googleLogin,checkPhone,otpLogin} from "../../../application/useCase/user/auth/userAuth"
import {suggestFriend,addFollower,removeFollower} from '../../../application/useCase/user/auth/userDetails'
const authController=(
    authServiceInterface:AuthServiceInterface,
    authService:AuthServices,
    UserDbInterface:UserDbInterface,
    userDbservice:userRepositoryMongoDB

)=>{
    const dbUserRepository=UserDbInterface(userDbservice())
    const authServices=authServiceInterface(authService())


    const registerUser=asyncHandler(async(req:Request,res:Response)=>{
   
        
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
       
        
    
                  if(user.status===true){

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
     
      
        const { email } = req.body;
        const values = { email};
    
   googleLogin(values, dbUserRepository, authServices).then((response)=>{


  
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

        
      
        const { phone } = req.body;
        
        const data = { phone};
      
        

        otpLogin(data,dbUserRepository, authServices).then((response)=>{
            if(response?.status===true){
                res.json({ status: true, message: "User Logined", response });
            }else {
                res.json({ status: false });
              }
        })

    });

    const findSuggest =asyncHandler(async(req:Request,res:Response)=>{
       
        
        try{
            const {userId}=req.params;
            const data = await suggestFriend(userId,dbUserRepository)
            res.json(data)
        }catch(error){
            console.log(error);
            
        }
    });


    const putFollower=asyncHandler(async(req:Request,res:Response)=>{
        try{
            const {id}=req.body;
            const {userId}=req.params;
            const data=await addFollower(id,userId,dbUserRepository)
            if(data){
                res.json(data)
            }
        }catch(error){
            console.log(error);
            
        }
    });

    const putUnFollow = asyncHandler(async (req: Request, res: Response) => {
        try {
          const { id } = req.body;
          const { userId } = req.params;
          const data = await removeFollower(id, userId, dbUserRepository);
          if (data) res.json(data);
        } catch (error) {
          console.log(error);
        }
      });

    return{
        registerUser,
        loginUser,
        loginWithGoogle,
        checkotpNumber,
        loginWithOtp,
        findSuggest,
        putFollower,
        putUnFollow,
    }
}
export default authController;