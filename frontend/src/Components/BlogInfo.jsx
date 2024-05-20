import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogDetails } from "../API/endpoints";
import "../ComponentCSS/BlogInfo.css";

const BlogInfo = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  const fetchBlog = async () => {
    try {
      console.log(id);
      const res = await getBlogDetails(id);
      console.log(res.data, "12345");
      setBlog(res.data);
    } catch (error) {
      console.log(error, "Error in fetching post");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      <div className="blog-info">
        <div className="blog-image">
          <img
            src={`http://localhost:5000/${blog.image}`}
            alt=""
            className="image"
          ></img>
        </div>
        <div className="blog-detail">
          <h1>{blog.title}</h1>
          <h2>{blog.description}</h2>
          <p className="comment-heading">Comments</p>
          {blog.comments ? (
            <ul>
              {blog.comments.map((comment) => {
                return <li>{comment.text}</li>;
              })}
            </ul>
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogInfo;
