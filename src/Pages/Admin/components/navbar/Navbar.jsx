import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";

import Button from "../UI/Button/Button.jsx";
import "../UI/Button/Button.css";
import logo from "../../assets/logo.png"
import "./Navbar.css";
import {Link} from "react-router-dom";

const Navbar = (auth) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isAuth,setIsAuth]=useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <nav className="navbar container">
      <div className="logo">
        <img src={logo} alt="Fancied Story Logo" className="logoImage"/>
      </div>
      <menu>
        <ul
          className="nav-links"
          id={showMenu ? "nav-links-mobile" : "nav-links-mobile-hide"}
        >
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            {/*<a href="#LearnMore">Who are we?</a>*/}
          </li>
          <li>
            {/*<Link to={"/campaign/uploads"}>This Month !</Link>*/}
          </li>
          <li>
            {/*<a href="#subscribe">Contact Us</a>*/}
          </li>

          {/* <li>
            <a href="#" className="btn btn-dark">
              Get Started
            </a>
          </li> */}
          <li className="nav-btn">
            <Button text={"Learn More"} btnClass={"btn-dark"} href={"#faq"} />
          </li>
        </ul>
      </menu>
      <div className="menu-icons" onClick={toggleMenu}>
        {showMenu ? (
          <RiCloseLine color="#fff" size={30} />
        ) : (
          <AiOutlineBars color="#fff" size={27} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
