import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBlog, createComment, deleteBlog, deleteComment, getBlog,getBlogDetails,getFilteredPost,getProfile,getSearchPost,updateBlog, updateBlogByPatch } from "../../API/endpoints";

export const getPost=createAsyncThunk("post/getPosts",async()=>{
  try{
    const response=await getBlog();
    console.log(response.data);
    return response.data;
  }catch(err){
    console.log(err,'error during fetching post data');
  }
})

export const createPost=createAsyncThunk("post/createPost",async(data)=>{
  try{
    const res=await createBlog(data);
    return res.data;
  }catch(err){
    console.log(err,'error during fetching create post');
  }
})

export const getPostById=createAsyncThunk("/post/getPostById",async({id})=>{
  try{
    const res=await getBlogDetails(id)
    console.log(res.data);
    return res.data;
  }catch(err){
    console.log(err,'error during fetching particular post data');
  }
})

export const updatePost=createAsyncThunk("/post/updatePost",async({formData,id})=>{
  try{
    const res=await updateBlog(formData,id);
    console.log(res.data);
    return res.data;
  }catch(err){
    console.log(err,'error during updating post');
  }
})

export const deletePost=createAsyncThunk("/post/deletePost",async(id)=>{
  try{
    const res=await deleteBlog(id);
    return res.data;
  }catch(err){
    console.log(err,'error during deleting post');
  }
})

export const addComment=createAsyncThunk("/post/addComment",async({data,id})=>{
  try{
    const res=await createComment(data,id);
    return res.data;
  }catch(err){
    console.log(err,'error during adding comments');
  }
})

export const delComment=createAsyncThunk("post/deleteComment",async({id,commentId})=>{
  try{
    const res=await deleteComment(id,commentId);
    return res.data;
  }catch(err){
    console.log(err,'error during deleting comments');
  }
})

export const getFilterPost=createAsyncThunk("post/getFilterPost",async()=>{
  try{
    const response=await getBlog();
    console.log(response.data);
    return response.data;
  }catch(err){
    console.log(err,'error during fetching post filter data');
  }
})

export const fetchFilteredPost=createAsyncThunk("post/fetchFilteredPost",async({title,created_Date})=>{
  try{
    const response=await getFilteredPost(title,created_Date);
    return response.data;
  }catch(err){
    console.log(err,'error during fetching filtered post');
  }
})

export const toggleLikeBtn=createAsyncThunk("post/toggleLikeBtn",async({liked,postId})=>{
  try{
    const response=await updateBlogByPatch({liked},postId);
    return response.data;
  }catch(err){
    console.log(err,'error during editing blog by patch method');
  }
})

export const fetchUserProfile=createAsyncThunk("auth/fetchUserProfile",async(userId)=>{
  try{
    const response=await getProfile(userId);
    return response.data.user;
  }catch(err){
    console.log(err,'error during fetching user profile');
  }
})

export const fetchSearchByDatePost=createAsyncThunk("post/fetchSearchByDatePost",async(searchText)=>{
  try{
    const response=await getSearchPost(searchText);
    return response.data;
  }catch(err){
    console.log(err,'error during fetching search by post');
  }
})


