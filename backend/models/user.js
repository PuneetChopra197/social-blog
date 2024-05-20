import mongoose from "mongoose";


const UserSchema=mongoose.Schema({
  userName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  confirmPassword:{
    type:String
  },
  newPassword:{
    type:String
  },
  country:{
    type:String,
    default:""
  },
  state:{
    type:String,
    default:""
  },
  zipcode:{
    type:String,
    default:""
  },
  profilePhoto:{
    type:String,
    default:""
  }
})

export const User=mongoose.model("User",UserSchema)