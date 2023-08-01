import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFax,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <section id="footer">
      <div className="container footer">
        <div className="footer-box">
          <h4>Useful Links</h4>
          <div className="footer-links">
            <Link to="/campaign/Uploads">&bull; Write A letter To your Younger Self</Link>
            {/*<a href="#">&bull; About</a>*/}
            {/*<a href="#">&bull; Learn</a>*/}
            {/*<a href="#">&bull; Hosting</a>*/}
            {/*<a href="#">&bull; Messenger</a>*/}
            {/*<p>Coming Soon...</p>*/}
          </div>
        </div>
        <div className="footer-box">
          <h4>Support</h4>
          <div className="footer-links">
            <a href="#">&bull; Fancied Families</a>
            <a href="#">&bull; About</a>
            <a href="#">&bull; Fancied Gallery</a>
          </div>
        </div>
        <div className="footer-box">
          <h4>Contact Us</h4>
          <div className="footer-contact u-text-small">
            <p>
              <FaMapMarkerAlt /> &nbsp; Nairobi, Kenya.
            </p>
            {/*<p>*/}
            {/*  <FaPhoneAlt /> &nbsp; Phone: +254 ...*/}
            {/*</p>*/}
            <p>
              <FaEnvelope /> &nbsp; Email: fanciedstory1@gmail.com
            </p>
            <p>
              <FaGlobe /> &nbsp; <a style={{fontsize: "inherit" ,textDecoration:"none"}}
                                    href="https://fanciedstory.network">fanciedstory.network</a>
            </p>
          </div>
        </div>

        <div className="footer-box">
          <img src={logo} alt="logo" className={"footerLogo"}/>
          <p className="u-text-small">&copy; Copyright 2023. <a href="https://www.jerryfromkenya.space">Group X</a><br/>for Fancied Story Network </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
