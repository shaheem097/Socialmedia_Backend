import dotenv from "dotenv";

dotenv.config();

const configKeys = {
  MONGO_URL: "mongodb://127.0.0.1:27017/socialmedia",
  PORT: process.env.PORT || 5001,
  JWT_SECRET:"SECRET_KEY123"
};

export default configKeys;