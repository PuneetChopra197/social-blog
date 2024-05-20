// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getBlogDetails } from "../API/endpoints";
// import { useState } from "react";
// import { useEffect } from "react";

// const BlogUpdate = () => {
//   const [updateBlog, setUpdateBlog] = useState({
//     title: "",
//     description: "",
//     // image: null,
//   });
//   console.log(updateBlog);
//   const navigate = useNavigate();
//   const handleEditBlog = () => {
//     navigate("/Main");
//   };

//   const { id } = useParams();
//   console.log(id);
//   const fetchPost = async () => {
//     try {
//       const res = await getBlogDetails({ id });
//       console.log(res);
//       if (res.data) {
//         setUpdateBlog({
//           title: res.data.title,
//           description: res.data.description,
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchPost();
//   }, [id]);
//   return (
//     <>
//       <center>
//         <div className="login-container">
//           <h2>Edit Blog</h2>
//           <label>Title</label>
//           <input type="text" placeholder=" Give title"></input>
//           <label>Description</label>
//           <input type="text" placeholder="Write Description"></input>

//           <label>Image:</label>
//           <input type="file" accept="image/*"></input>

//           <button className="login-button" onClick={handleEditBlog}>
//             Edit Blog
//           </button>
//         </div>
//         {/* <hr></hr> */}
//       </center>
//     </>
//   );
// };

// export default BlogUpdate;
