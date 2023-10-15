import {AuthServiceReturn} from "../../../framework/services/user/userAuthServiceImp"

export const AuthServiceInterface=(service:AuthServiceReturn)=>{
    const encryptPassword=async(password:string)=>{
    return await service.encryptPassword(password)
    };
    const generateToken=async(userId:string)=>{
        return service.generateToken(userId);
    };
    const comparePassword=async(password:string,bodyPassword:string)=>{
        return await service.comparePassword(password,bodyPassword)
    }
    return{
        encryptPassword,
        generateToken,
        comparePassword,
    };
}
export type AuthServiceInterface=typeof AuthServiceInterface