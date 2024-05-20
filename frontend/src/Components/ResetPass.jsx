import React, { useState } from "react";
import "../ComponentCSS/ResetPass.css";
import { resetPassword } from "../API/endpoints";
import { useNavigate, useParams } from "react-router-dom";

const ResetPass = () => {
  const navigate = useNavigate();
  const getEmail = useParams();
  const [email, setEmail] = useState(getEmail.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      await resetPassword({ email, newPassword });
      setMessage("Password reset successfully");
      navigate("/");
    } catch (error) {
      console.log(error, "Error resetting password");
    }
  };
  return (
    <>
      <center>
        <div className="pass-container">
          <h1>Reset Password</h1>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br></br>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
          <br></br>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <br></br>

          <button className="pass-button" onClick={handleResetPassword}>
            Reset Pass
          </button>
          <br></br>
          <p>{message}</p>
        </div>
      </center>
    </>
  );
};

export default ResetPass;
