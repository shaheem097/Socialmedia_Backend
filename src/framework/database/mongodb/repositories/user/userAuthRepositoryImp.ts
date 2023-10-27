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

    
    return user
  }
  const getUserByPhone=async(phone:number)=>{
    // console.log(phone,"phone varunnund");
    
    const user:any=await User.findOne({phone:phone});
    return user
  }

  const getUserByName=async(username:string)=>{
   
    
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


const suggestionUser=async (userId:string)=>{
  try{
    const data:any =await User.findById(userId);
    const followingIds:any =data.following;
    const remainingdata:any=await User.find({
      $and:[{_id:{$nin:followingIds}},{_id:{$ne:userId}}],

    }).exec();
    return remainingdata;

  }catch(error){
    console.log(error);
    
  }
};


const addFollower=async (friendId:string,userId:string)=>{
  console.log(friendId,userId);
  try {
    const data:any=await User.findByIdAndUpdate(
      {_id:friendId,followers:{$ne:userId} },
      {
        $addToSet:{
          followers:userId,
        },
      },
      {
        new:true,
      }
    )
    const details:any=await User.findByIdAndUpdate(
      {_id:userId,following:{$ne:friendId}},
      {
         $addToSet:{
          following:friendId
         },
      },
      {
        new:true,
      }
    );
    return {data,details}
  } catch (error) {
    console.log(error);
    
  }
};

const removeFollower = async (friendId: string, userId: string) => {
  try {
    const data = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { following: friendId } },
      { new: true }
    );
    const details = await User.findByIdAndUpdate(
      { _id: friendId },
      { $pull: { followers: userId } },
      { new: true }
    );
    return { data, details };
  } catch (error) {
    console.log(error);
  }
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
        unBlockCurrUser,
        suggestionUser,
        addFollower,
        removeFollower
    }

}

export type userRepositoryMongoDB= typeof userRepositoryMongoDB;