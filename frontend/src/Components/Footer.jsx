import React from "react";
import '../ComponentCSS/Footer.css';
import {FaHeart} from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";

const Footer=()=>{
    return(
        <div className="container">
            <div className="footer1">
                <div className="foot1">
                    <p className="foot1-head ">Training Blog</p>
                    <p className="foot1-body">
                        Welcome To Our Technical Blog.Where We Delve Into The World Of
                        Cutting-Edge Technologies And Explore Their Practical Applications.
                    </p>
                </div>
                <div className="foot2">
                    <p className="foot2-head">CATEGORY</p>
                    <p className="foot2-body">HTML</p>
                    <p className="foot2-body">CSS</p>
                    <p className="foot2-body">JAVASCRIPT</p>
                    <p className="foot2-body">VS CODE</p>
                </div>
                <div className="foot3">
                    <p className="foot3-head">GET IN TOUCH</p>
                    <p className="foot3-body">+91-8XXX-XXX-XX</p>
                    <p className="foot3-body">demo@gmail.com</p>
                </div>
                <div className="foot4">
                    <p className="foot4-head">FOLLOW US ON</p>
                    <div className="foot4-icon1">
                        <FaSquareTwitter />
                    </div>
                    <div className="foot4-icon2">
                        <FaInstagram />
                    </div>
                    <div className="foot4-icon3">
                        <FaLinkedin />
                    </div>
                </div>
                <hr style={{ width: "100%" }} />
            </div>
            <div className="footer2">
                <div className="footer2-left">© 2023 TRAININGBLOG</div>
                <div className="footer2-right">
                    MADE WITH <FaHeart className="fa-solid fa-heart" style={{ color: "red" }} />{" "}
                    MOHALI,INDIA
                </div>
            </div>

        </div>
    )
}

export default Footer