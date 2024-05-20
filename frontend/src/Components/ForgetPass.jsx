import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../ComponentCSS/ForgetPass.css";
import { forgetPassword } from "../API/endpoints";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  // const [error,setError]=useState("");
  //   const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChangepass = async () => {
    try {
      const res = await forgetPassword({ email });
      setMessage(res.data.message);
      console.log(res.data);
    } catch (err) {
      console.log(err, "Error");
    }
  };

  return (
    <>
      <center>
        <div className="pass-container">
          <h1>Change Password</h1>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          <button onClick={handleChangepass} className="pass-button">
            Change Pass
          </button>
          <br></br>
          <p>{message}</p>
        </div>
      </center>
    </>
  );
};
export default ForgetPass;
