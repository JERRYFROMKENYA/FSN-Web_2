import React, {useEffect, useRef, useState} from "react";
import emailjs from '@emailjs/browser';
import {serviceID, templateID , publicKey} from "./keys.json"
import "./Subscribe.css";
import { TiMail } from "react-icons/ti";
import {FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaAt} from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";

const Subscribe = () => {
  const [username,setUsername]=useState("")
  const [useremail,setUseremail]= useState("")
  const [usermessage,setUsermessage]= useState("")
  const contactForm = useRef();
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const  formHandle=(e)=>
  {
    e.preventDefault()
    emailjs.sendForm(
        serviceID,
        templateID, contactForm.current,
        publicKey)
        .then((result) => {
          setUsername('')
          setUseremail('')
          setUsermessage('')
          alert("Message Sent!")
        }, (error) => {
          alert("Oops! error sending your message!")
        });
  }
  return (
    <section id="subscribe">
      <div className="container subscribe" data-aos="fade-up">
        <h2>Talk to us now!</h2>
        <form ref={contactForm} name={"contactForm"}>
          <div className="form-control">
            <p>Name:</p>
            <input type="text" name={"name"} id="name" required={true} value={username}
                   onChange={(e)=>{setUsername(e.target.value)}}/>
            <br/>
            <p>Email:</p>
            <input type="email" name={"useremail"} id="useremail"
                   className={"email"} required={true} value={useremail}
                   onChange={(e)=>setUseremail(e.target.value)} />
            <br/>

            <p>Message:</p>
            <input name={"message"} type="text" id="message"
                   className={"message"} required={true} value={usermessage}
                   onChange={(e)=>setUsermessage(e.target.value)}/>

            <br/>
            <button onClick={formHandle}>Send</button>{/*add func for form handling*/}
          </div>
        </form>
        <div className="social-icons">
          <div className="social-icon" onClick={()=> {
            parent.location = 'mailto:fanciedstory1@gmail.com'
          }}>
            <TiMail />
          </div>
          <a className="social-icon" href={"https://www.threads.net/@fanciedstorynetwork"}>
            <FaAt />
          </a>
          <a className="social-icon" href={"twitter.com/fanciedstorynetwork"}>
            <FaTwitter />
          </a>
          <a className="social-icon" href={"https://www.instagram.com/fanciedstorynetwork/"}>
            <FaInstagram />
          </a>
          {/*<a className="social-icon">*/}
          {/*  <FaWhatsapp />*/}
          {/*</a>*/}
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
