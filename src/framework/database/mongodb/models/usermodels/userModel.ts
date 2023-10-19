import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
   
    username: {
      type: String,
      required: true,
      // unique:true
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      // required:true
    },
    dp: {
      type: String,
    },
    bio: {
      type: String,
    },
   
    location: {
      type: String,
    },
   
    isBlock: {
      type: Boolean,
      default: false,
    },
    followers: [],
    following: [],
  },
  {
    timestamps: true,
  }
);

const User = model("user", userSchema);
export default User;
