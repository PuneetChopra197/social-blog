import axios from "axios";

const BASE_URL='http://localhost:5000';
// const token=localStorage.getItem('token');
const API=axios.create({
  baseURL:BASE_URL,
  // headers:{
  //   Authorization:`Bearer ${token}`,
  // },
});

API.interceptors.request.use(async(req)=>{
  const token=localStorage.getItem('token');
  req.headers.Authorization=`Bearer ${token}`;
  return req;
})

API.interceptors.response.use(async(res)=>{
  return res
},
(error)=>{
  if(error.response?.status===401){
    throw error;
  }
  throw error;
});

export const createBlog=(data)=>API.post("/post/blog",data);
export const deleteBlog=(id)=>API.delete(`/post/blog/${id}`); 
export const getBlog=()=>API.get("/post/blog");
export const getBlogDetails = (id) => API.get(`/post/blog/${id}`);
export const updateBlog=(data,id)=>API.put(`/post/blog/${id}`,data);
export const updateBlogByPatch=(data,id)=>API.patch(`/post/blog/${id}`,data);
export const createComment=(data,id)=>API.post(`/post/blog/${id}/comments`,data);
export const deleteComment=(id,commentId)=>API.delete(`/post/blog/${id}/comments/${commentId}`);
export const getProfile=(id)=>API.get(`/auth/profile/${id}`);
export const updateUserProfile=(data,id)=>API.put(`/auth/profile/${id}`,data);
export const updateProfilePhoto=(data,id)=>API.patch(`/auth/profile/${id}`,data);
export const forgetPassword=({email})=>API.post(`/auth/send-mail`,{email});
export const resetPassword=({email,newPassword})=>API.post("/auth/reset-password",{email,newPassword});
export const getFilteredPost=(title,created_Date)=>API.get(`/post/filtered-posts?title=${title}&created_Date=${created_Date}`);
export const getSearchPost=(searchText)=>API.get(`/post/search-posts?searchText=${searchText}`);