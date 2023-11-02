import { UserDbInterface } from "../../../repositories/user/userRepositoryInf";
import { AuthServiceInterface } from "../../../services/user/userAuthServiceInt";


export const userRegister =async(

    user:{
       
        username:string;
        phone:number;
        email:string;
        password:any
    },
    userRepository:ReturnType<UserDbInterface>,
    authService:ReturnType<AuthServiceInterface>

)=>{
    user.email=user.email.toLocaleLowerCase();
    user.phone=user.phone
    user.username=user.username

    const isUserNameExist:any=await userRepository.getUserByName(user.username);

    const isEmailExist:any=await userRepository.getUserByEmail(user.email);
    
    const isPhoneExist:any=await userRepository.getUserByPhone(user.phone);

    if(isEmailExist&&isPhoneExist&&isUserNameExist){
        return {status:false,message:"Username,Email & Phonenumber Allready Exist"};
    }else if(isEmailExist&&isPhoneExist){
        return {status:false,message:"Email & Phonenumber Allready Exist"};
    } 
    else if(isUserNameExist&& isEmailExist){
        return {status:false,message:"Username & Email Allready Exist"};
    }else if(isUserNameExist&& isPhoneExist){
        return {status:false,message:"Username & Phone Allready Exist"};
    } else if(isUserNameExist ){
        return {status:false,message:"Username Allready Exist"};
    }
    else if(isEmailExist ){
        return {status:false,message:"Email Allready Exist"};
    }else if(isPhoneExist){
        return {status:false,message:"Phone number Allready Exist"};
    }
    else{ 
      console.log("workingggggggggggggggggggggggg");
      
        let encryptPassword=await authService.encryptPassword(user.password);
        user.password=encryptPassword;
        const response=await userRepository.addUser(user);
        console.log(response,"PPPPPPPPPPPPPPPPPPPPPPPPPPPP");
        let userId = response._id;
        let UserName=response.username;
        const token=await authService.generateToken(userId.toString());
        console.log(token);
        
        const userData={
           token,
           userId,
           UserName

        }
        return {status:true,userData}
    }
};

export const userLogin=async(
    user:{email:string; password:string},
    userRepository:ReturnType<UserDbInterface>,
    authService:ReturnType<AuthServiceInterface>
)=>{
    let userExist:any =await userRepository.getUserValid(user.email);
    
    
    if(!userExist){
        return {status :false};
    }
    let checkPassword=await authService.comparePassword(
        user.password,
        userExist.password
    );
    const token=await authService.generateToken("1234567890".toString())
   
    const userData={
        token,
        isBlock:userExist.isBlock,
        userId: userExist._id,
        UserName: userExist.username,

    }
   
    if(checkPassword){
        return{status:true,userData}
    }else{
        return {status:false}
    }
};


export const googleLogin = async (
    user: { email: string},
    userRepository: ReturnType<UserDbInterface>,
    authService: ReturnType<AuthServiceInterface>
  ) => {
    // user.email = user.email.toLowerCase();
    const isEmailExist: any = await userRepository.getUserByEmail(user.email);
    const isBlockorNot=isEmailExist.isBlock

    console.log(isBlockorNot,"goooogle block anooooooooo");
    
    if (isEmailExist&&!isBlockorNot) {
       
    const userId = isEmailExist._id
    const token = await authService.generateToken(userId.toString());
    console.log(token,"tpken in usecase ethiiiii m,akkaleeeeeeeeeee");
    const userData = {
      userId : userId,
      UserName : isEmailExist.username,
      
      token: token
    }
        return { status: true,userData};
    
      }else if(isBlockorNot===true){
         return {blocked:true}
      }else{
        return {status:false}
      }
    
    };

    export const checkPhone = async (user: { phone: number }, userRepository: ReturnType<UserDbInterface>) => {
        console.log(user.phone, "checkkkkkkkkkkkkkk");
      
        const isPhoneExist: any = await userRepository.getUserByPhone(user.phone);
        
       console.log(isPhoneExist,"resultttttttt");
       
          if (isPhoneExist) {
            const isBlock = isPhoneExist.isBlock;
            console.log(isBlock, "block anoooooooooooooo");
      
            if (isBlock === true) {
              return { blocked: true };
            } else {
              return { status: true };
            }
          }
        return { status: false };
      };
      

    export const otpLogin=async(
        user:{phone:number},
        userRepository: ReturnType<UserDbInterface>,
        authService: ReturnType<AuthServiceInterface>
    )=>{
        console.log(user.phone,"loooooooooginnnnnnnnnnnusec");

        const isPhoneExist:any=await userRepository.getUserByPhone(user.phone);
      if(isPhoneExist){
        const userId=isPhoneExist._id
        const token = await authService.generateToken(userId.toString());
    console.log(token,"tokken vanneeeeeeeeeeee");
    const userData={
        userId:userId,
        UserName:isPhoneExist.username,
        token:token
    }

    return {status:true,userData}

      }
    }

    export const getUserWithId = async(userId:string,userRepository:ReturnType<UserDbInterface>)=>{
        try {
          const data = await userRepository.getUserIdProfile(userId)
          return data
          
        } catch (error) {
          console.log(error);
        }
    }

    export const ExistorNot = async (user: any, userRepository: ReturnType<UserDbInterface>) => {
        // Convert email and phone to lowercase if they exist
        if (user.email) user.email = user.email.toLowerCase();
      
        const { username, email, phone } = user;
      
        const isUserNameExist = username ? await userRepository.getUserByName(username) : null;
        const isEmailExist = email ? await userRepository.getUserByEmail(email) : null;
        const isPhoneExist = phone ? await userRepository.getUserByPhone(phone) : null;
      
        if (isEmailExist && isPhoneExist && isUserNameExist) {
          return { status: false, message: "Username, Email & Phone Number Already Exist" };
        } else if (isEmailExist && isPhoneExist) {
          return { status: false, message: "Email & Phone Number Already Exist" };
        } else if (isUserNameExist && isEmailExist) {
          return { status: false, message: "Username & Email Already Exist" };
        } else if (isUserNameExist && isPhoneExist) {
          return { status: false, message: "Username & Phone Number Already Exist" };
        } else if (isUserNameExist) {
          return { status: false, message: "Username Already Exist" };
        } else if (isEmailExist) {
          return { status: false, message: "Email Already Exist" };
        } else if (isPhoneExist) {
          return { status: false, message: "Phone Number Already Exist" };
        } else {
            return { status: true, message: "Data does not exist" };
          }
      };


    export const profileUpdate=async(
        username:string,
        email:string,
        phone:number,
        bio:string,
        location:string,
        profileUrl:string,
        userId:string,
        userRepository: ReturnType<UserDbInterface>,
        authService: ReturnType<AuthServiceInterface>
    )=>{
        const updateUser:any=await userRepository.updateUser(
            username,
            email,
            phone,
            bio,
            location,
            profileUrl,
            userId,
        )
        return updateUser
    }
      