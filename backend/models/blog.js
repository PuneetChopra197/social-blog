import mongoose from "mongoose";


const BlogSchema=mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  image:{     
    type:String, 
  },
  created_Date:{
    type:Date,
  },
  liked:{
    type:Boolean,
    default:false
  },
  user:{
    type:String,
  },
  comments:[
    {
      text:{
        type:String,
      },
      createdAt:{
        type:Date,
        default:Date.now
      },
    },
  ],
  updated_Date:{
    type:Date
  }
})

export const Blog=mongoose.model('Blog',BlogSchema);