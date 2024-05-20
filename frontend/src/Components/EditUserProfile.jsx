import React, { useEffect, useState } from "react";
import "../ComponentCSS/EditUserProfile.css";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfilePhoto,
  updateUserProfile,
} from "../API/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../Redux/actions/post";

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const { userData: initialUserData } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    country: "",
    state: "",
    zipcode: "",
  });

  const userDetails = async () => {
    try {
      dispatch(fetchUserProfile(userId));
      // const res = await getProfile(userId);
      // console.log(res.data, "userprofile");

      // setUserData(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userDetails();
  }, [dispatch, userId]);

  useEffect(() => {
    if (initialUserData) {
      setUserData(initialUserData);
    }
  }, [initialUserData]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("profilePhoto", userData.profilePhoto);
      await updateProfilePhoto(formData, userId);
      await updateUserProfile(userData, userId);
      navigate("/UserProfile");
    } catch (error) {
      console.log("Error in updating", error);
    }
  };
  // console.log(userData, "dflkskldf");

  const handleCancel = () => {
    getProfile();
    navigate("/UserProfile");
  };
  return (
    <>
      <div className="edit-user-profile">
        <br></br>
        <input
          type="text"
          placeholder="Enter Username"
          value={userData.userName}
          onChange={(e) =>
            setUserData({ ...userData, userName: e.target.value })
          }
          className="input-fields"
        ></input>
        <br></br>

        <input
          type="email"
          placeholder="Enter Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="input-fields"
        ></input>
        <br></br>

        <input
          type="text"
          placeholder="Enter Country"
          value={userData.country}
          onChange={(e) =>
            setUserData({ ...userData, country: e.target.value })
          }
          className="input-fields"
        ></input>
        <br></br>

        <input
          type="text"
          placeholder="Enter State"
          value={userData.state}
          onChange={(e) => setUserData({ ...userData, state: e.target.value })}
          className="input-fields"
        ></input>
        <br></br>

        <input
          type="text"
          placeholder="Enter Zipcode"
          value={userData.zipcode}
          onChange={(e) =>
            setUserData({ ...userData, zipcode: e.target.value })
          }
          className="input-fields"
        ></input>
        <br></br>
        <input
          type="file"
          className="file-input"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files.length) {
              setUserData({ ...userData, profilePhoto: e.target.files[0] });
            } else {
              setUserData({});
            }
          }}
        ></input>
        <br></br>
        <button className="update" onClick={() => handleUpdate()}>
          Update
        </button>
        <button className="cancel" onClick={() => handleCancel()}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditUserProfile;
