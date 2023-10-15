import mongoose from "mongoose"
import configkeys from "../../../../config/config"


mongoose.set("strictQuery",true);
const connectDB=async()=>{
try {
    await mongoose.connect(configkeys.MONGO_URL).then(()=>{
        console.log(`Database connected succesfully`);  
    })
} catch (error) {
    console.log(`Database error${error}`); 
    process.exit(1)
}
}
export default connectDB;