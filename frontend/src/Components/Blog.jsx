import React from "react";
import "../ComponentCSS/Blog.css";
import { useNavigate } from "react-router-dom";
// import { FaHeart, FaComment } from "react-icons/fa";
// import { FaRegHeart } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

// import img1 from "../Assets/img1.png";
// import img2 from "../Assets/img2.png";
import { useState } from "react";
import { useEffect } from "react";
// import { FaEdit } from "react-icons/fa";
// import axios from "axios";
// import { deleteBlog, updateBlogByPatch } from "../API/endpoints";
// import { getBlog } from "../API/endpoints";
import Post2 from "./Post2";
import HeaderLower from "./HeaderLower";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../Redux/actions/post";

const Blog = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/AddBlog");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [allPosts, setAllPosts] = useState([]);
  const [render, setRender] = useState(false);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  console.log(posts, "2580");
  // const [show, setShow] = useState(false);

  // const handleIconColor = () => {
  //   setShow(!show);
  // };

  // const fetchPosts = async () => {
  //   try {
  //     const res = await getBlog();
  //     if (res.data) {
  //       setPosts(res.data);

  // setPosts(res.data.map((post) => ({...post,liked:false})))
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    dispatch(getPost());
  }, [render]);

  // const handleDeleteBlog = async (id) => {
  //   try {
  //     await deleteBlog(id);
  //     fetchPosts();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const toggleLike = async (postId) => {
  //   await updateBlogByPatch({ liked: !posts.liked }, postId);
  //   setRender(!render);
  // };

  // const [heartColor, setHeartColor] = useState("black");

  // const handleIconColor = () => {
  //   heartColor === "black" ? setHeartColor("red") : setHeartColor("black");
  // };

  return (
    <>
      <HeaderLower posts={allPosts} setPosts={setAllPosts} />
      <div className="blog">
        <div className="blog1">Blog Posts</div>
        <div className="blog-div">
          <button className="blog-button" onClick={handleButtonClick}>
            Create Blog
          </button>
        </div>
        <div className="logout-div">
          <button className="logout-button" onClick={handleLogout}>
            LogOut
          </button>
        </div>
      </div>
      {/* <h2>Posts</h2> }
      { {posts.map((post) => {
        return (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            { {post.image && (
            <img
              src={`http://localhost:5000/uploads/${post.image}`}
              alt={post.title}
              style={{ maxWidth: "100%" }}
            />
          )}
         </div>
          
        );
      })} } */}
      <div className="bottom">
        {posts?.map((post, index) => {
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const createDate = new Date(post.created_Date);
          // console.log(createDate, "abcd");
          let day = createDate.getDate();
          let monthIndex = createDate.getMonth();
          let year = createDate.getFullYear();
          let monthName = months[monthIndex];

          let currentDate = `${monthName} ${day},${year}`;
          // console.log(currentDate, "Today Date");
          // const createDate = new Date(post.created_Date);
          return (
            <Post2
              post={post}
              index={index}
              currentDate={currentDate}
              render={render}
              setRender={setRender}
            />
          );
        })}
      </div>
    </>
  );
};
export default Blog;
