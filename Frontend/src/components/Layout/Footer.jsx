import { AiOutlineInstagram } from "react-icons/ai"; 
import { AiFillFacebook } from "react-icons/ai"; 
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../main';
import { FaLinkedin } from "react-icons/fa"; 
import { FaYoutube } from "react-icons/fa"; 


const Footer = () => {
  const {isAuthorized} = useContext(Context);

   return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved</div>
      <div>
        <Link to ={'/'} target = "_blank"><AiFillFacebook size={"25px"}/></Link>
        <Link to ={'/'} target = "_blank"><FaYoutube size={"25px"}/></Link>
        <Link to ={'/'} target = "_blank"><FaLinkedin size={"25px"}/></Link>
        <Link to ={'/'} target = "_blank"><AiOutlineInstagram size={"25px"}/></Link>

      </div>
    </footer>
  )
}

export default Footer
