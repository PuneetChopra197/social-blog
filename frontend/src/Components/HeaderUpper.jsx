import React, { useEffect, useState } from "react";
import "../ComponentCSS/HeaderUpper.css";
import { FaRocketchat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { getProfile } from "../API/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../Redux/actions/post";

const HeaderUpper = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  // const [userData, setUserData] = useState({});
  const userId = localStorage.getItem("userId");
  const getUserProfile = async () => {
    try {
      dispatch(fetchUserProfile(userId));
      // const res = await getProfile(userId);
      // console.log(res.data, "98765");
      // setUserData(res.data.user);
    } catch (error) {
      console.log("Error fetching profile", error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <div className="container">
      <div className="top">
        <div className="title">
          <div className="chatterly">Chatterly</div>
          <div className="title-icon">
            <FaRocketchat
              className="fa-solid fa-comments"
              style={{ marginLeft: "-15px" }}
            />
          </div>
        </div>
        <div className="right-top">
          <div className="top-img">
            <img
              src={`http://localhost:5000/${userData.profilePhoto}`}
              alt=""
              className="img1"
              onClick={() => navigate("/UserProfile")}
            />
          </div>
          <div className="img1-txt" onClick={() => navigate("/UserProfile")}>
            {userData.userName}
          </div>
        </div>
        <hr style={{ width: "100%" }} />
      </div>
    </div>
  );
};
export default HeaderUpper;
