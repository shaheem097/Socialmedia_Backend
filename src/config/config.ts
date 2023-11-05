import dotenv from "dotenv";

dotenv.config();

const configKeys = {
  MONGO_URL: "mongodb://127.0.0.1:27017/socialmedia",
  PORT: process.env.PORT ,
  secretKey:process.env.JWT_SECRET
};

export default configKeys;