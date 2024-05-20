import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, updatePost } from "../Redux/actions/post";
const BlogDetails = () => {
  // Retrieve the particular blog post from Redux store
  const post = useSelector((state) => state.posts.post);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const [blogDetail, setBlogDetail] = useState({
    title: "",
    description: "",
    image: "",
  });

  // const blogDetails = async () => {
  //   try {
  //     const res = await getBlogDetails(id);
  //     console.log(res, "dgfdgf");

  //     setBlogDetail({
  //       title: res.data.title,
  //       description: res.data.description,
  //       image: res.data.image,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    if (id) {
      dispatch(getPostById({ id }));
    }
  }, [dispatch, id]);

  // Update local state when the blog detail changes
  useEffect(() => {
    if (post) {
      setBlogDetail({
        title: post.title || "",
        description: post.description || "",
        image: post.image || "",
      });
    }
  }, [post]);

  const handleEditblog = async () => {
    try {
      const formData = new FormData();
      formData.append("title", blogDetail.title);
      formData.append("description", blogDetail.description);
      formData.append("image", blogDetail.image);
      dispatch(updatePost({ id, formData }));
      // blogDetails();
      navigate("/Main");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoBack = () => {
    navigate("/Main");
  };

  console.log(blogDetail, "dsfjfh");
  return (
    <center>
      <button onClick={() => handleGoBack()} className="goback-button">
        Go Back
      </button>
      <div className="login-container">
        <h2>Edit Blog</h2>
        <label>Title</label>
        <input
          type="text"
          placeholder=" Give title"
          value={blogDetail.title}
          onChange={(e) => {
            setBlogDetail({ ...blogDetail, title: e.target.value });
          }}
        />
        <label>Description</label>
        <input
          type="text"
          placeholder="Write Description"
          value={blogDetail.description}
          onChange={(e) => {
            setBlogDetail({
              ...blogDetail,
              description: e.target.value,
            });
          }}
        />
        <br></br>
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setBlogDetail({
              ...blogDetail,
              image: e.target.files[0],
            });
          }}
        />
        <br></br>
        <button className="login-button" onClick={() => handleEditblog()}>
          Edit Blog
        </button>
        <br></br>
      </div>
      {/* <hr></hr> */}
    </center>
  );
};
export default BlogDetails;
