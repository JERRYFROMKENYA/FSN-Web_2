import React, {useEffect, useState} from "react";
import "./Header.css";
import Button from "../UI/Button/Button.jsx";
import "../UI/Button/Button.css";
import HeaderHero from "../../assets/HeaderHero.png";
import youAreNotAloneHeader from "../../assets/youarenotalone1.png";
import { BsMouse } from "react-icons/bs";

import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const [HeaderPic,setHeader]=useState(youAreNotAloneHeader)

      useEffect(()=>
      {
        let x =Math.floor(Math.random()*15)
        if(x%2==0)
        {
           setHeader(HeaderHero)
        }
        else
        {
          setHeader(youAreNotAloneHeader)
        }
      })

  return (
    <section id="header">
      <div className="container header">
        <div className="header-left" data-aos="fade-right">
          <h1>
            <span>You are not Alone</span>
            <span>You are Seen</span>
            <span>You are Loved</span>
            <span>You are Heard</span>
          </h1>
          <p className="u-text-small">
            FANCIED STORY NETWORK (FSN) is a social
            movement which was formed on February 3rd 2022.The movement
            was formed initially as a form of self-expression on the lack of
            awareness on the general mental health state of our society on a
            day-to-day basis. It is steadily growing both locally and
            internationally with a current membership of more than 140 +
            members.
          </p>
          <div className="header-cta">
            <Button text={"Join us"} btnClass={"btn-dark"} href={"#subscribe"} />
            <Button text={"Contact Us"} btnClass={"btn-light"} href={"#subscribe"} />
          </div>
        </div>
        <div className="header-right" data-aos="fade-left">
          <img src={HeaderPic} alt="You are not Alone" />
        </div>
      </div>
      <div className="floating-icon">
        <a href="#LearnMore">
          <BsMouse color="#fff" size={25} className="mouse" />
        </a>
      </div>
      <br/><br/>
    </section>
  );
};

export default Header;
