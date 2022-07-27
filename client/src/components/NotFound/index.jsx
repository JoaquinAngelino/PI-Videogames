import React from "react";
import { Link } from "react-router-dom";
import style from './NotFound.module.css'

export default function NotFound(){

  return (
    <div className={style.notFoundDiv}>
      <h1 className={style.notFoundH1}>404, Page not found</h1>
      <Link className={style.notFoundLink} to="/home">back to <span className={style.notFoundSpan}>/home</span></Link>
    </div>
  )
}