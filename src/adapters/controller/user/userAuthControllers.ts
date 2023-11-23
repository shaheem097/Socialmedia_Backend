import {Request,Response,response} from "express"
import asyncHandler from "express-async-handler";
import { userRepositoryMongoDB } from '../../../framework/database/mongodb/repositories/user/userAuthRepositoryImp';
import { AuthServiceInterface } from '../../../application/services/user/userAuthServiceInt';
import {AuthServices} from "../../../framework/services/user/userAuthServiceImp";
import {UserDbInterface,userDbRepository} from "../../../application/repositories/user/userRepositoryInf";
import {userRegister,userLogin,googleLogin,
       checkPhone,otpLogin,getUserWithId,
       ExistorNot,profileUpdate} from "../../../application/useCase/user/auth/userAuth"
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
      
      
        const response:any = await userRegister(user,dbUserRepository,authServices)
       const UserData=response.userData
       if(response.status==true){
         
         const token=response.token
      
            res.json({status:true,message:"User registerd",UserData,token})
        }else{
            res.json({status:false,UserData})
        }
        
    });

    const loginUser=asyncHandler(async(req:Request,res:Response)=>{
   
        const {email,password}=req.body;
        const userDetails={email,password};
        const user:any=await userLogin(userDetails,dbUserRepository,authServices)
        
                  if(user.status===true){

                    const userData=user.userData
                    const token=user.token
                    if(userData?.isBlock===true){
                        res.json({ blocked: true});
                    }else{
                     
                        res.json({status:true,userData,token});
                    }
                   
                  }else{
                    res.json({status:false})
                  }    
    });

    const loginWithGoogle = asyncHandler(async (req: Request, res: Response) => {
      const { email } = req.body;
      const values = { email };
    
      try {
        const response = await googleLogin(values, dbUserRepository, authServices);
    
        if (response?.status === true) {
          if (response.userData) {
            const token=response.token
            const userData=response.userData
            res.json({ status: true, message: "User Logged in", userData,token});
          } else {
            res.status(500).json({ status: false, message: "User data is undefined" });
          }
        } else if (response?.blocked) {
          res.json({ blocked: true });
        } else {
          res.status(500).json({ status: false, message: "Login failed" });
        }
      } catch (error) {
        // Handle any errors that may occur during the execution
        console.error("Error during login:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
      }
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
                const userData=response.userData
                const token=response.token
                res.json({ status: true, message: "User Logined", userData,token});
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
      console.log("foloooooooooooooooow");
      
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
      console.log("unfoloooooooooooooow");
      
        try {
          const { id } = req.body;
          const { userId } = req.params;
          const data = await removeFollower(id, userId, dbUserRepository);
          if (data) res.json(data);
        } catch (error) {
          console.log(error);
        }
      });

      const getUserDetails = asyncHandler(async (req: Request, res: Response) => {
        try {
 
          const { userId } = req.params;
          const data = await getUserWithId(userId, dbUserRepository);
          res.json(data);
        } catch (error) {
          console.log(error);
        }
      });

      const  checkExistingData = asyncHandler(async (req: Request, res: Response) => {
        
        const { username, phone, email } = req.body;
      
        
        console.log(req.headers);
        
      
        // Initialize the user object with default values
        const user = {
          username: '',
          email: '',
          phone: '',
        };

        // Check if data is provided and update the user object accordingly
        if (username) user.username = username;
        if (email) user.email = email;
        if (phone) user.phone = phone.toString();
      
        const data = await ExistorNot(user, dbUserRepository);
        console.log(data);

       
        if (data.status) {
            res.json({ status: true, message: 'Data does not exist' });
        } else {
            res.json({ status: false, message: data.message });
        }
        
      });


      const updateUser=asyncHandler(async(req,res)=>{
        
        const { username, email,phone,bio,location, profileUrl } = req.body;
        const {userId}=req.params;

        const userUpdate = await profileUpdate(
            username,
            email,
            phone,
            bio,
            location,
            profileUrl,
            userId,
            dbUserRepository,
            authServices
          );
          console.log(userUpdate);
          
        res.json({ profileupdated: userUpdate });
      })


    return{
        registerUser,
        loginUser,
        loginWithGoogle,
        checkotpNumber,
        loginWithOtp,
        findSuggest,
        putFollower,
        putUnFollow,
        getUserDetails,
        checkExistingData,
        updateUser,
    }
}
export default authController;