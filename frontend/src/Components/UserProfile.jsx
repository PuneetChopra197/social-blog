// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
// import img from "../Assets/img4.jpeg";
import "../ComponentCSS/UserProfile.css";
import { useNavigate } from "react-router-dom";
// import { getProfile } from "../API/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { fetchUserProfile } from "../Redux/actions/post";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { userData } = useSelector((state) => state.posts);

  console.log(posts);
  // const [userData, setUserData] = useState({});
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const getUserInfo = async () => {
    try {
      dispatch(fetchUserProfile(userId));
      // const res = await getProfile(userId);
      // console.log(res.data, "12345");
      // setUserData(res.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  console.log(userData, "userDatauserData");
  return (
    <>
      <div className="user">
        <img
          src={`http://localhost:5000/${userData.profilePhoto}`}
          alt=""
          className="user-icon"
        ></img>
      </div>
      <div className="edit-div">
        <button
          className="edit-profile"
          onClick={() => navigate("/EditUserProfile")}
        >
          Edit
        </button>
      </div>
      <div className="users">
        <div className="user-info">
          <p>Username:{userData.userName}</p>
          <p>E-mail:{userData.email}</p>
          <p>Country:{userData.country}</p>
          <p>State:{userData.state}</p>
          <p>Zipcode:{userData.zipcode}</p>
        </div>
        <div className="posts">
          <p className="blog-head">Blogs</p>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {posts.map((post) => {
              return (
                <SwiperSlide>
                  <img
                    src={`http://localhost:5000/${post.image}`}
                    alt="user"
                    className="post-image"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
