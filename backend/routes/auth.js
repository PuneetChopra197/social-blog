import express from "express";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { upload } from "../middleware/fileUpload.js";
import nodemailer from "nodemailer";

const authRouter=express.Router()

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: "puneetchopra197@gmail.com",
    pass: "xuiw xlvs ubpt omlf",
  },
});

//POST API for Forget Password Page
authRouter.post("/send-mail/",async(req,res)=>{
  const {email}=req.body;
  try{
    const user=await User.findOne({email})
    if(!user){
      return res.status(404).json({message:"Receiver mail not found"})
    }
    const mailOptions={
      from:"puneetchopra197@gmail.com",
      to:email,
      subject:"Forget Password",
      text:`Click on this link for reset password http://localhost:3000/ResetPass/${email}`,
    }
    await transporter.sendMail(mailOptions)
    res.status(200).json({message:"Email is sent successfully"});
  }catch(err){
    console.log(err,'2580');
  }
})


//POST API for Reset Password Page
authRouter.post("/reset-password",async(req,res)=>{
  const {email,newPassword}=req.body;
  try{
    const user=await User.findOne({email});
    if(!user){
      return res.status(404).json({message:'User not exists'});
    }
    const saltValue=10;
    const hashPassword=await bcrypt.hash(newPassword,saltValue);
    user.password=hashPassword;
    await user.save();
    res.status(200).json({message:'Password reset successfully'})
  }catch(err){
    console.log(err,'Error during the reset password');
  }
})


//POST API for SignUp using Database
authRouter.post("/signup",async(req,res)=>{
  try{
    const {userName,email,password,confirmPassword}=req.body
    const existingUser=await User.findOne({email})

    if(existingUser){
      return res.status(400).json({message:'User already exists'})
    }
    const saltValue=10
    const hashPassword=await bcrypt.hash(password,saltValue)
    const user=new User({
      userName,
      email,
      password:hashPassword,
    });
    await user.save();
    res.status(201).json({message:'User Created Successfully'}); 
  }
  catch(err){
    console.log(err);
  }
});


//POST API for Login using Database
authRouter.post("/login",async(req,res)=>{
  try{
    const {email,password}=req.body

  if(!email || !password){
    return res.status(400).json({message:'All fields are required'});
  }
  const existingUser=await User.findOne({email})
  if(!existingUser){
    return res.status(400).json({message:'User not found'});
  }
  const matchPassword=await bcrypt.compare(password,existingUser.password)
  if(!matchPassword){
    return res.status(400).json({message:'Invalid Password'});
  }
  const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_KEY);
  const userId=existingUser._id
  res.status(200).json({message:'Login successfully',token,userId})
  }
  catch(err){
    console.log(err);
  }
});


//GET API for user profile
authRouter.get("/profile/:id",async(req,res)=>{
  const userId=req.params.id;
  try{
    const user=await User.findById(userId).select("-password")
    if(!user){
      return res.status(404).json({message:'User not found'})
    }
    res.status(200).json({message:'User profile retrived successfully',user})
  }catch(err){
    console.log(err,'abcd');
  }
})


//UPDATE(PUT) API for user profile
authRouter.put("/profile/:id",async(req,res)=>{
  const userId=req.params.id;
  try{
    const user=await User.findById(userId).select("-password")
    if(!user){
      return res.status(404).json({message:'User not found'})
    }
    const {userName,email,country,state,zipcode}=req.body;
    user.userName=userName || user.userName;
    user.email=email;
    user.country=country;
    user.state=state;
    user.zipcode=zipcode;
    await user.save()
    res.status(200).json({message:'User profile retrived successfully',user});
  }catch(err){
    console.log(err,'abcd');
  }
})



//UPDATE(PATCH) API for user profile
// authRouter.patch("/profile/:id",async(req,res)=>{
//   const userId=req.params.id;
//   const updateFields=req.body;
//   try{
//     const updateProfile=await User.findByIdAndUpdate(userId,updateFields,{new:true})
//     res.status(200).json({message:'User profile retrived successfully',updateProfile});
//   }catch(err){
//     console.log(err,'abcd');
//   }
  
// })


//UPDATE(PATCH) API for profilePhoto
authRouter.patch("/profile/:id",upload.single("profilePhoto"),async(req,res)=>{
  const userId=req.params.id;
  
  try{
    const profilePhoto=req.file.path;
    const user=await User.findById(userId,{new:true})

    if(!user){
      return res.status(404).json({message:'User not found'});
    }
    user.profilePhoto=profilePhoto;
    await user.save()
    res.status(200).json({message:'User profile retrived successfully',user});
  }catch(err){
    console.log(err,'abcd');
  }
})

//UPDATE API for change password
authRouter.patch("/change-password",async(req,res)=>{
  try{
    const {email,password,newPassword}=req.body;
    const user=await User.findOne({email})
    if(user){
      const saltValue=10;
      const hashPassword=await bcrypt.hash(newPassword,saltValue);
      const oldPassword=await bcrypt.compare(password,user.password);
      if(oldPassword){
        user.password=hashPassword;
      }
      else{
        res.status(400).json({message:'Previous Password not matched'})
      }
    }else{
      res.status(400).json({message:'User not exists'});
    }
    
    await user.save();
    res.status(200).json({message:'Password changed successfully'});
  }catch(err){
    console.log(err,'abcd');
  }
})

export default authRouter