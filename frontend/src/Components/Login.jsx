import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../ComponentCSS/Login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  //console.log(formData);

  const handleSubmit = async () => {
    let error = {};

    if (formData.email.trim() === "") {
      error.email = "Email is required";
    }
    if (!formData.password) {
      error.password = "Password is required";
    }
    if (Object.keys(error).length === 0) {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );

      console.log(res, "reserves");
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        navigate("/Main");
      }
    } else {
      setErrors(error);
    }
  };
  console.log(formData);
  //console.log(errors, '123456789');
  return (
    <>
      <div className="login-container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <input
              type="email"
              placeholder="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onChangeCapture={(e) => setErrors({})}
            ></input>
          </div>
          <div className="errors">
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              onChangeCapture={(e) => setErrors({})}
            ></input>
          </div>
          <div className="errors">
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password}</span>
            )}
          </div>
        </div>
        <div className="password-link">
          <a href="/ForgetPass">Forget Password?</a>
        </div>
        <div className="submit">
          <button onClick={handleSubmit} className="login-button">
            Login
          </button>
        </div>
        <div className="signup-link">
          <a href="/SignUp">Don't have an account? Create account</a>
        </div>
      </div>
    </>
  );
};
export default Login;
