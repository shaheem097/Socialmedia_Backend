import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import configKeys from '../../../config/config';
import  {token} from "morgan"


export const authServices=()=>{
    const encryptPassword=async (password:string)=>{
        console.log(password,"passworddd");
        
        const salt =await bcrypt.genSalt(10);
       let bcryptPassword=await bcrypt.hash(password,salt);
        console.log(bcryptPassword,"pasword bcrypted");
        
        return bcryptPassword
    };
    const generateToken=async (userId:string,username:string)=>{
    const user={
        id:userId,
        username:username
    }
        if(configKeys.secretKey){
            const token= jwt.sign(user,configKeys.secretKey,{
                expiresIn:"30d",
                
            })
          
            
            return token;
        }else{
            throw new Error("JWT TOKEN is not defined");

        }

    };
    const comparePassword=async (password:string,bodyPassword:string)=>{
        const passwordMatch=await bcrypt.compare(password,bodyPassword)
        return passwordMatch

    };
    const verifyToken=(token:string)=>{
        if(configKeys.secretKey){
            const isVerify=jwt.verify(token,configKeys.secretKey)
            return isVerify
        }
    };
    return{
        encryptPassword,
        generateToken,
        comparePassword,
        verifyToken
    }
    };

    export type AuthServices=typeof authServices;
    export type AuthServiceReturn=ReturnType<AuthServices>