import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   role:{
       type: String,
       required: true,
       default: "user",
       enum:["user", "admin"],
       trim: true
   },
   name:{
       type: String,
       required: true,
       trim: true
   },
   email: {
       type: String,
       required: true,
       unique: true,
       trim: true
   },
   password: {
       type: String,
       required: true,
       trim: true
   },
   bio:{
       type: String,
       trim: true
   },
   avatar: {
       type: String,
       trim: true
   }
}, {
    timestamps: true
})

const User= mongoose.model("User", userSchema,"users");

export default User
   
    