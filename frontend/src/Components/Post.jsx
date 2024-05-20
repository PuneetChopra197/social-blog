import React from "react";
import img1 from "../Assets/img1.png";
import img2 from "../Assets/img2.png";
import img3 from "../Assets/img3.png";
import "../ComponentCSS/Post.css";
import { FaHeart, FaComment } from "react-icons/fa";

const Post = () => {
  return (
    <>
      <div className="blog">
        <div className="blog1">Blog Posts</div>
        <div className="blog-div">
          <button className="blog-button">Create Blog</button>
        </div>
      </div>
      <div className="bottom">
        <div className="bottom-img">
          <img src={img2} alt="" className="img2" />
          <p className="img2-txt">
            How To Make GUI In Java With Example Example
          </p>
          <div className="bot-bot">
            <div className="img3">
              <img src={img1} alt="" className="bot-img1" />
            </div>
            <div className="img3-txt1">
              <b>Dasteen</b>
              <br />
              Jan10,2022
            </div>
            <div className="img3-icon1">
              <FaHeart className="fa-solid fa-heart" />
              03
            </div>
            <div className="img3-icon2">
              <FaComment className="fa-solid fa-comment" />
              12
            </div>
          </div>
        </div>
        <div className="bottom-img">
          <img src={img2} alt="" className="img2" />
          <p className="img2-txt">
            How To Make GUI In Java With Example Example
          </p>
          <div className="bot-bot">
            <div className="img3">
              <img src={img1} alt="" className="bot-img1" />
            </div>
            <div className="img3-txt1">
              <b>Dasteen</b>
              <br />
              Jan10,2022
            </div>
            <div className="img3-icon1">
              <FaHeart className="fa-solid fa-heart" />
              03
            </div>
            <div className="img3-icon2">
              <FaComment className="fa-solid fa-comment" />
              12
            </div>
          </div>
        </div>
        <div className="bottom-img">
          <img src={img2} alt="" className="img2" />
          <p className="img2-txt">
            How To Make GUI In Java With Example Example
          </p>
          <div className="bot-bot">
            <div className="img3">
              <img src={img1} alt="" className="bot-img1" />
            </div>
            <div className="img3-txt1">
              <b>Dasteen</b>
              <br />
              Jan10,2022
            </div>
            <div className="img3-icon1">
              <FaHeart className="fa-solid fa-heart" />
              03
            </div>
            <div className="img3-icon2">
              <FaComment className="fa-solid fa-comment" />
              12
            </div>
          </div>
        </div>
        <div className="bottom-img">
          <img src={img3} alt="" className="img2" />
          <p className="img2-txt">
            How To Make GUI In Java With Example Example
          </p>
          <div className="bot-bot">
            <div className="img3">
              <img src={img1} alt="" className="bot-img1" />
            </div>
            <div className="img3-txt1">
              <b>Dasteen</b>
              <br />
              Jan10,2022
            </div>
            <div className="img3-icon1">
              <FaHeart className="fa-solid fa-heart" />
              03
            </div>
            <div className="img3-icon2">
              <FaComment className="fa-solid fa-comment" />
              12
            </div>
          </div>
        </div>
        <div className="bottom-img">
          <img src={img3} alt="" className="img2" />
          <p className="img2-txt">
            How To Make GUI In Java With Example Example
          </p>
          <div className="bot-bot">
            <div className="img3">
              <img src={img1} alt="" className="bot-img1" />
            </div>
            <div className="img3-txt1">
              <b>Dasteen</b>
              <br />
              Jan10,2022
            </div>
            <div className="img3-icon1">
              <FaHeart className="fa-solid fa-heart" />
              03
            </div>
            <div className="img3-icon2">
              <FaComment className="fa-solid fa-comment" />
              12
            </div>
          </div>
        </div>
        <div className="bottom-img">
          <img src={img3} alt="" className="img2" />
          <p className="img2-txt">
            How To Make GUI In Java With Example Example
          </p>
          <div className="bot-bot">
            <div className="img3">
              <img src={img1} alt="" className="bot-img1" />
            </div>
            <div className="img3-txt1">
              <b>Dasteen</b>
              <br />
              Jan10,2022
            </div>
            <div className="img3-icon1">
              <FaHeart className="fa-solid fa-heart" />
              03
            </div>
            <div className="img3-icon2">
              <FaComment className="fa-solid fa-comment" />
              12
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Post;
