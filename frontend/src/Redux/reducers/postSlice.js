import { createSlice } from "@reduxjs/toolkit"
import { addComment, deletePost, fetchFilteredPost, fetchSearchByDatePost, fetchUserProfile, getFilterPost, getPost, getPostById, updatePost } from "../actions/post"

const initialState={
  posts:[],
  postForFilter:[],
  userData:{},
  blogs:[],
  post: null, // State for a particular post
  loading:false,
  error:null
}

export const postSlice=createSlice({
  name:'postSlice',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    // Handle getPost actions
    builder.addCase(getPost.pending,(state)=>{
      state.loading=true
    });
    builder.addCase(getPost.fulfilled,(state,action)=>{
      state.loading=false
      state.posts=action.payload
    });
    builder.addCase(getPost.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    });

    // Handle updatePost actions
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.loading = false;
      const updatedPost = action.payload;

      // Update the post in the state
      const index = state.posts.findIndex((post) => post.id === updatedPost.id);
      if (index !== -1) {
          state.posts[index] = updatedPost;
      }
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //Handle getPostById actions
    builder.addCase(getPostById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload; // Store the fetched post data in the `post` state
    });
    builder.addCase(getPostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //Handle deletePosyById actions
    builder.addCase(deletePost.pending,(state)=>{
      state.loading=true;
    });
    builder.addCase(deletePost.fulfilled,(state,action)=>{
      state.loading=false;
      state.posts=state.posts.filter(blog=>blog.id!==action.payload);
    });
    builder.addCase(deletePost.rejected,(state,action)=>{
      state.loading=false;
      state.error = action.error.message;
    });

    //Handle addComment actions
    builder.addCase(addComment.pending, (state) => {
        state.loading = true;
      })
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading=false;
      const { data,id } = action.payload || {};  
      const post = state.posts.find((post) => post._id === id);
      if (post&&data) {
        post.comments.push(data);
      }
    })
    builder.addCase(addComment.rejected, (state, action) => {
      state.loading=false;
      state.error = action.error.message; 
    });

    // Handle getFilterPost actions
    builder.addCase(getFilterPost.pending,(state)=>{
      state.loading=true
    });
    builder.addCase(getFilterPost.fulfilled,(state,action)=>{
      state.loading=false
      state.postForFilter=action.payload
    });
    builder.addCase(getFilterPost.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    });

    //Handle fetchFilteredPost actions
    builder.addCase(fetchFilteredPost.pending,(state)=>{
      state.loading=true
    });
    builder.addCase(fetchFilteredPost.fulfilled,(state,action)=>{
      state.loading=false
      state.posts=action.payload
    });
    builder.addCase(fetchFilteredPost.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    });

    //Handle fetchUserProfile actions
    builder.addCase(fetchUserProfile.pending,(state)=>{
      state.loading=true
    });
    builder.addCase(fetchUserProfile.fulfilled,(state,action)=>{
      state.loading=false
      state.userData=action.payload
    });
    builder.addCase(fetchUserProfile.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    });

    //Handle fetchSearchByDatePost actions
    builder.addCase(fetchSearchByDatePost.pending,(state)=>{
      state.loading=true
    });
    builder.addCase(fetchSearchByDatePost.fulfilled,(state,action)=>{
      state.loading=false
      state.blogs=action.payload
    });
    builder.addCase(fetchSearchByDatePost.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    });
  }
})

// Export the reducer for use in your Redux store
export const postReducer = postSlice.reducer;

export default postReducer;