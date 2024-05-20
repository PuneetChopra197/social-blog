import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import img1 from "../Assets/img1.png";
import { updateBlogByPatch } from "../API/endpoints";
import { useDispatch } from "react-redux";
import {
  addComment,
  delComment,
  deletePost,
  getPost,
  toggleLikeBtn,
} from "../Redux/actions/post";

const Post2 = ({ post, currentDate, render, setRender }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState(false);
  const [text, setText] = useState("");
  const [numberOfCommentsToShow, setNumberOfCommentsToShow] = useState(false);

  const handleDeleteBlog = async (id) => {
    dispatch(deletePost(id));
    dispatch(getPost());
  };

  const toggleLike = async (postId) => {
    // await updateBlogByPatch({ liked: !post.liked }, postId);
    dispatch(toggleLikeBtn({ liked: !post.liked, postId }));
    dispatch(getPost());
    setRender(!render);
  };

  const showComment = () => {
    setComment(!comment);
  };

  const handleComment = async (data, id) => {
    if (!id) {
      console.error("Post ID is not defined.");
      return;
    }
    // console.log("Comment added");
    try {
      dispatch(addComment({ data, id }));
      dispatch(getPost());
      setRender(!render);
      setText("");
      setComment(!comment);
    } catch (error) {
      console.log("Error adding comment", error);
    }
  };
  // console.log(remark, "text");

  const toggleComments = () => {
    setNumberOfCommentsToShow(!numberOfCommentsToShow);
  };

  const handleDeleteComment = async (id, commentId) => {
    try {
      dispatch(delComment({ id, commentId }));
      dispatch(getPost());
      setRender(!render);
    } catch (error) {
      console.log("Error deleting comment", error);
    }
  };

  return (
    <>
      {!comment ? (
        <div className="bottom-img" key={post._id}>
          <img
            src={`http://localhost:5000/${post.image}`}
            alt="created blog"
            className="img2"
          />
          <p>
            <FaEdit
              className="img3-icon4"
              onClick={() => navigate(`/BlogDetails/${post._id}`)}
            />
          </p>
          <p className="img2-txt">
            Title:{post.title}
            <br></br>
            Description:{post.description}
          </p>
          <hr></hr>
          <div className="bot-bot">
            <div className="img3">
              <img
                src={`http://localhost:5000/${post.image}`}
                alt="user"
                className="bot-img1"
              />
            </div>
            <div className="img3-txt1">
              <b>Dasteen</b>
              <br />
              {currentDate}
              {/* createDate */}
            </div>
            <div className="img3-icon1">
              {post.liked ? (
                <FaHeart
                  className="fa-solid fa-heart"
                  style={{ color: "red" }}
                  onClick={() => toggleLike(post._id)}
                />
              ) : (
                <FaRegHeart onClick={() => toggleLike(post._id)} />
              )}
              03
            </div>

            <div className="img3-icon2">
              <FaComment
                className="fa-solid fa-comment"
                onClick={() => showComment()}
              />
              12
            </div>
            <div className="img3-icon3">
              <MdDelete onClick={() => handleDeleteBlog(post._id)} />
            </div>
          </div>
        </div>
      ) : (
        <div className="bottom-img" key={post._id}>
          <img
            src={`http://localhost:5000/${post.image}`}
            alt="created blog"
            className="img2"
          />
          <p>
            <FaEdit
              className="img3-icon4"
              onClick={() => navigate(`/BlogDetails/${post._id}`)}
            />
          </p>
          <p className="img2-txt">
            Title:{post.title}
            <br></br>
            Description:{post.description}
          </p>
          <div className="bot-bot">
            <div className="img3">
              <img
                src={`http://localhost:5000/${post.image}`}
                alt="user"
                className="bot-img1"
              />
            </div>
            <div className="img3-txt1">
              <b>Dasteen</b>
              <br />
              {currentDate}
              {/* createDate */}
            </div>
            <div className="img3-icon1">
              {post.liked ? (
                <FaHeart
                  className="fa-solid fa-heart"
                  style={{ color: "red" }}
                  onClick={() => toggleLike(post._id)}
                />
              ) : (
                <FaRegHeart onClick={() => toggleLike(post._id)} />
              )}
              03
            </div>

            <div className="img3-icon2">
              <FaComment
                className="fa-solid fa-comment"
                onClick={() => showComment()}
              />
              12
            </div>
            <div className="img3-icon3">
              <MdDelete onClick={() => handleDeleteBlog(post._id)} />
            </div>
          </div>
          <br />
          <div className="comment">
            <input
              type="text"
              placeholder="Enter Comments"
              className="comment-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
            <button
              className="comment-button"
              onClick={() => handleComment({ text }, post._id)}
            >
              Add
            </button>
            {numberOfCommentsToShow
              ? post.comments.map((comment, index) => (
                  <div key={index}>
                    <div style={{ width: "300px", float: "left" }}>
                      {comment.text}
                    </div>
                    <div className="del-comment">
                      <MdDelete
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleDeleteComment(post._id, comment._id)
                        }
                      />
                    </div>
                  </div>
                ))
              : post.comments.slice(0, 2).map((comment, index) => (
                  <div key={index}>
                    {comment.text}
                    <span className="del-comment">
                      <MdDelete
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleDeleteComment(post._id, comment._id)
                        }
                      />
                    </span>
                  </div>
                ))}
            <button onClick={() => toggleComments()}>
              {numberOfCommentsToShow ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Post2;
