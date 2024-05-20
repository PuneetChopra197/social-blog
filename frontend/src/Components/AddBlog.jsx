import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { createBlog } from "../API/endpoints";
import "../ComponentCSS/AddBlog.css";
import { useDispatch } from "react-redux";
import { createPost, getPost } from "../Redux/actions/post";
// import axios from "axios";

// import { useEffect } from "react";

const AddBlog = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const handleButtonClick = async () => {
    let error = {};

    if (data.title.trim() === "") {
      error.title = "Title is required";
    }
    if (!data.description) {
      error.description = "Description is required";
    }
    if (Object.keys(error).length === 0) {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("image", data.image);
        // const token = localStorage.getItem("token");

        // const headers = {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // };
        // const res = await axios.post("http://localhost:5000/post/blog", data, {
        //   headers,
        // });
        dispatch(createPost(formData));
        setData({
          title: "",
          description: "",
          image: {},
        });
        // fetchPosts();
        // if (res.data) {
        //   console.log(res.data, "123");
        // }
        navigate("/Main");

        // console.log(res, "reserves");
      } catch (error) {
        console.log("Error adding post:", error.message);
      }
    }
    // } else {
    setErrors(error);
    // }
  };

  const handleGoBack = () => {
    navigate("/Main");
  };

  // console.log(posts, "postsposts");
  console.log(data);

  return (
    <>
      <center>
        <button onClick={() => handleGoBack()} className="goback-button">
          Go Back
        </button>
        <div className="login-container">
          <h2>Add Blog</h2>
          <label>Title</label>
          <input
            type="text"
            placeholder=" Give title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          ></input>

          <br></br>
          {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
          <label>Description</label>
          <input
            type="text"
            placeholder="Write Description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          ></input>
          <br></br>
          {errors.description && (
            <span style={{ color: "red" }}>{errors.description}</span>
          )}
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length) {
                const selectedFile = e.target.files[0];
                setData({ ...data, image: selectedFile });
              } else {
                setData({ ...data, image: {} });
              }
            }}
          ></input>
          <br></br>
          {errors.image && <span style={{ color: "red" }}>{errors.image}</span>}
          <button className="login-button" onClick={handleButtonClick}>
            Add Blog
          </button>
          <br></br>
        </div>
        {/* <hr></hr> */}
      </center>
    </>
  );
};
export default AddBlog;
