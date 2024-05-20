import express from "express";
import { Blog } from "../models/blog.js";
import { applyMiddleWare } from "../middleware/auth.js";
import multer from "multer";
import moment from "moment";

const postRouter=express.Router()

const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"uploads/")
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+"_"+file.originalname);
  },
});

const upload=multer({storage:storage});

//POST API for Blog using Database
postRouter.post("/blog",applyMiddleWare,upload.single("image"),async(req,res)=>{
  if(!req.file){
    return res.status(400).json({message:'No File Found'})
  }
  try{
    const blog=new Blog({
      title:req.body.title,
      description:req.body.description,
      image:req.file.path,
      user:req.user,
      created_Date:new Date()
    });
    const newBlog=await blog.save();
    res.status(201).json(newBlog)
  }
  catch(err){
    // console.log(err);
    res.status(400).json({ message: err.message });
  }
})

//GET API for Blog using Database (Route for fetching all posts)
postRouter.get("/blog",applyMiddleWare,async(req,res)=>{
  try{
    const userId=req.user
    const blog=await Blog.find({user:userId})
    res.json(blog);
  }
  catch(err){
    console.log(err);
  }
})

//GET API By Id for Blog using Database ( Route for fetching a specific post by ID)
postRouter.get("/blog/:id",applyMiddleWare,async(req,res)=>{
  try{
    const id=req.params.id;
    const blog=await Blog.findById(id)
    res.json(blog);
  }
  catch(err){
    console.log(err);
  }
})

//UPDATE (PUT) API for Blog using Database( Route for updating a specific post by ID)
postRouter.put("/blog/:id",applyMiddleWare,upload.single("image"),async(req,res)=>{
  const id=req.params.id;
  const {title,description}=req.body;
  const image = req.file.path
  if(!title || !description){
    res.status(400).json({message:"All fields are required"});
  }
  
    else{
      try{
        const updatedBlog=await Blog.findByIdAndUpdate(
          id,
          {
            title,
            description,
            image,
            created_Date:new Date()
          },
          {new:true});
        res.json(updatedBlog)
      }
      catch(err){
        console.log(err);
      }
  }
})

// Route for partially updating a specific post by ID
postRouter.patch("/blog/:id", applyMiddleWare, async (req, res) => {
  const id = req.params.id;
  const updateFields = req.body;
  try {
    const updatedPost = await Blog.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to update post" });
  }
});

//DELETE API for Blog using Database(Route for deleting a specific post by ID)
postRouter.delete("/blog/:id",applyMiddleWare,async(req,res)=>{
  try{
    const id=req.params.id;
    const deleteBlog=await Blog.findByIdAndDelete(id);
    if(!deleteBlog){
      return res.status(404).json({message:"Blog doesn't exist"})
    }
    res.json({message:"Deleted successfully"})
  }
  catch(err){
    console.log(err);
  }
})

//API for adding comments
postRouter.post("/blog/:id/comments",async(req,res)=>{
  const id=req.params.id;
  const {text}=req.body;
  try{
    const post=await Blog.findById(id);
    if(!post){
      return res.status(404).json({message:'Post not found'})
    }
    post.comments.push({text});
    await post.save()
    res.status(201).json(post);
  }catch(err){
    console.log(err,'Error during creating comment');
  }
})

//API for deleting comments
postRouter.delete("/blog/:id/comments/:commentId",applyMiddleWare,async(req,res)=>{
  const id=req.params.id;
  const commentId=req.params.commentId;
  try{
    const post=await Blog.findById(id);
    if(!post){
      return res.status(404).json({message:"Post not found"})
    }
    post.comments.pull(commentId)
    await post.save()
    res.status(201).json(post);
  }catch(err){
    console.log(err,'Error during deleting comment');
  }
})

//API for Filtering Posts
postRouter.get("/filtered-posts",async(req,res)=>{
  try{
    const {title,created_Date}=req.query;
    let query={};
    if(title){
      query.title=title;
    }
    if(created_Date){
      const startOfDay=moment(created_Date).startOf("day").toDate();
      const endOfDay=moment(created_Date).endOf("day").toDate();
      query.created_Date={$gte:startOfDay,$lte:endOfDay}
    }
    const posts=await Blog.find(query);
    console.log("Posts found:",posts);
    res.json(posts);
  }catch(err){
    console.log("Error:",err);
    res.status(500).json({message:"Internal server error"})
  }
})

//API for Search Posts
postRouter.get("/search-posts",async(req,res)=>{
  try{
    const {searchText}=req.query;
    if(!searchText){
      return res.json([]);
    }
    const posts=await Blog.find({
      title:{$regex:searchText,$options:"i"}
    })
    res.json(posts);
  }catch(err){
    console.error("Error",err);
    res.status(500).json({message:"Internal Server Error"});
  }
})

//API for Search Posts
// postRouter.get("/search-posts",async(req,res)=>{
//   try{
//     const query=req.query.q;
//     if(!query){
//       return res.status(400).json({ error: 'Search query is required' });
//     }
//     const posts=await Blog.find();

//     const searchResults = posts.filter(post =>
//       post.title.toLowerCase().includes(query.toLowerCase())
//   );
//     res.json(searchResults);
//   }catch(err){
//     console.log("Error:",err);
//     res.status(500).json({message:"Internal server error"});
//   }
// })


export default postRouter