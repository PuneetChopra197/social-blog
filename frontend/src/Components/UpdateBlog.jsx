// import React from "react";
// import { useEffect, useState } from "react";
// import { getBlogDetails, updateBlog } from "../API/endpoints";
// import { useNavigate, useParams } from "react-router-dom";

// const UpdateBlog = async () => {
//   const navigate = useNavigate();
//   const [blogDetail, setBlogDetails] = useState({
//     title: "",
//     description: "",
//   });
//   const { id } = useParams();
//   console.log(id);
//   const blogDetails = async () => {
//     try {
//       const res = await getBlogDetails(id);
//       console.log(res);

//       setBlogDetails({
//         title: res.data.title,
//         description: res.data.title,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     blogDetails();
//   }, []);

//   const handleEditblog = async () => {
//     try {
//       await updateBlog(blogDetail, id);
//       // blogDetails();
//       navigate("/Main");
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <>
//       <center>
//         <div className="login-container">
//           <h2>Edit Blog</h2>
//           <label>Title</label>
//           <input type="text" placeholder=" Give title" />
//           <label>Description</label>
//           <input type="text" placeholder="Write Description" />
//           <br></br>
//           <label>Image:</label>
//           <input type="file" accept="image/*" />
//           <br></br>
//           <button className="login-button" onClick={() => handleEditblog()}>
//             Edit Blog
//           </button>
//           <br></br>
//         </div>
//         {/* <hr></hr> */}
//       </center>
//     </>
//   );
// };

// export default UpdateBlog;
