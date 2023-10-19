import User from "../../models/usermodels/userModel"

export const userRepositoryMongoDB=()=>{
    const addUser=async(user:{
        username?:string;
        phone?:number;
        email?:string
        password?:string;
    })=>{
        const newUser=new User(user);
        return await newUser.save();

    };
  const getUserByEmail=async(email:string)=>{
    console.log(email,"email varunnund");
    
    const user:any=await User.findOne({email:email});
    console.log(user,"ddddddddddddddddddddddfffffffffffffffffff");
    
    return user
  }
  const getUserByPhone=async(phone:number)=>{
    // console.log(phone,"phone varunnund");
    
    const user:any=await User.findOne({phone:phone});
    return user
  }

  const getUserByName=async(username:string)=>{
    console.log(username,"username varunnund");
    
    const user:any=await User.findOne({username:username});
    return user
  }

const getUserValid=async(email:string)=>{
  const user:any=await User.findOne({email:email})
  return user;
}
const newUserGoogle=async(user:{
  email:string;
  photoURL:string;
  displayName:string;
})=>{
  console.log(user,"gsdfghsdgfhgsdghjfgdshjfghdsjghsfdghjsdgfshdgfhjgfhegjhfdsjhgdj");

  const {email,displayName,photoURL}=user;
  try {
    const newUser = new User({
      email: email,
      username: displayName,
      dp: photoURL,
    });
    return await newUser.save();
  } catch (error) {
    console.log(error);
  }
  
};
const getAllUsers=async()=>{
  const users:any =await User.find();
  return users;
};

const blockCurrUser=async(userId:string)=>{
const status:any=await User.findOneAndUpdate(
  {_id:userId},
  {$set:{isBlock:true}},
  {new:true}
)
return status
};

const unBlockCurrUser = async (userId: string) => {
  const status: any = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { isBlock: false } },
    { new: true }
  );

  return status;
};

    return{
        addUser,
        getUserByEmail,
        getUserValid,
        newUserGoogle,
        getUserByPhone,
     
        getUserByName,
        getAllUsers,
        blockCurrUser,
        unBlockCurrUser
    }

}

export type userRepositoryMongoDB= typeof userRepositoryMongoDB;