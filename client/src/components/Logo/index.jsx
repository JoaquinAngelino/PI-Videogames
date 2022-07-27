import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png"
import style from "./Logo.module.css"

export default function Detail() {


  const handleClick = () => {
    if(window.location.pathname === "/home"){
      window.location.reload()
    }
  }

  return (
    <Link to="/home">
      <img onClick={handleClick} className={style.logo} src={logo} alt="Home" />
    </Link>
  )

}