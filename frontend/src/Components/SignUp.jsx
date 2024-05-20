import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import '../ComponentCSS/SignUp.css';
import axios from "axios";

const SignUp = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        confirmPassword: '',
        email: '',
    })
    const [errors, setErrors] = useState({})
    
    //console.log(formData);
    const navigate = useNavigate();
    const handleSubmit =async () => {
        let error = {};
        if (formData.userName.trim() === "") {
            error.userName = "Name is required"
        }
        if (!formData.password) {
            error.password = "Password is required"
        }
        if (!formData.confirmPassword || formData.confirmPassword !== formData.password) {
            error.confirmPassword = "Enter Confirm Password or Password not matching"
        }
        // if (formData.password != formData.confirmPassword){
        //     error.confirmPassword="Password not matching"
        // }
        if (!formData.email) {
            error.email = "E-mail is required"
        }
        if (Object.keys(error).length===0){
            const res=await axios.post("http://localhost:5000/auth/signup",formData)
            console.log(res,'reserves');
            if(res.data){
                console.log(res.data);
                navigate('/');
            }
            
        }
        else {
            setErrors(error)
        }
       
        
    };
    console.log(formData);
    //console.log(errors, '123456789');
    return (
        <>
            <center>
                <div className="signup-container">
                    <h2>Sign Up</h2>
                    <input
                        type="text"
                        placeholder="name"
                        value={formData.userName}

                        onChange={(e) => setFormData
                            ({ ...formData, userName: e.target.value })
                        }
                        onChangeCapture={(e) => setErrors({})}>
                    </input>
                    <br></br>
                    {errors.userName && <span style={{ color: 'red' }}>{errors.userName}</span>}
                    <br></br>
                    <input
                        type="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={(e) => setFormData
                            ({ ...formData, password: e.target.value })
                        }
                        onChangeCapture={(e) => setErrors({})}>
                    </input>
                    <br></br>
                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                    <br></br>
                    <input
                        type="password"
                        placeholder="confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData
                            ({ ...formData, confirmPassword: e.target.value })
                        }
                        onChangeCapture={(e) => setErrors({})}>
                    </input>
                    <br></br>
                    {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
                    <br></br>
                    <input
                        type="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={(e) => setFormData
                            ({ ...formData, email: e.target.value })
                        }
                        onChangeCapture={(e) => setErrors({})}>
                    </input>
                    <br></br>
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                    <br></br>
                    <button onClick={handleSubmit} className="signup-button">SignUp</button>
                </div>
            </center>
        </>
    )
}
export default SignUp