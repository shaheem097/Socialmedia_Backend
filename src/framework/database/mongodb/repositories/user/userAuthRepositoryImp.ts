import User from "../../models/usermodels/userModel"
import Post from "../../models/usermodels/postModel"

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

const getUserWidget = async (userId: string) => {
  try {
    const data = await User.findOne({ _id: userId });
    return data;
  } catch (error) {
    console.log(error);
  }
};


const updateUserData=async(
  username:string,
  email:string,
  phone:number,
  bio:string,
  location:string,
  profileUrl:string,
  userId:string
)=>{
  try{
    const user=await User.findOne({_id:userId})
    if(user){
     const newUser=await User.updateOne(
      {_id:userId},
      {
        $set:{
          username:username,
          email:email,
          phone:phone,
          bio:bio,
          location:location,
          dp:profileUrl
        },
      }
     );
    }
    const dataUser=await User.findOne({_id:userId});
    return dataUser;
  }catch(error){
    console.log(error);
    
  }
}


const getReportedPosts=async ()=>{
  try {
    const reportedPosts=await Post.find({
      report:{$exists:true,$not:{$size:0}}
    })

    return reportedPosts
  } catch (error) {
    console.log(error);
  }
}

const removeReport = async (postId: string, id: string) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return;
    }
    post.report.splice(0, 1);
    await post.save();
    return post;
  } catch (error) {
    console.log(error);
  }
};


const  reportConfirm = async(postId:string)=>{
  try {
     const post = await Post.findById(postId);
     if(!post) {return};
     post.adminDeleted = true;
    return   await post.save()
   
  } catch (error) {
   console.log(error); 
  }
}

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
        removeFollower,
        getUserWidget,
        updateUserData,
        getReportedPosts,
        removeReport,
        reportConfirm
    }

}

export type userRepositoryMongoDB= typeof userRepositoryMongoDB;