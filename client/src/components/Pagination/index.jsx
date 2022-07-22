import React from "react";
import style from './Pagination.module.css'

export default function Pagination({ postPerPage, totalPosts, paginate }) {

  let pages = []

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i)
  }

  return (
    <nav className={style.pagination}>
      <ul>
        {pages.map(e => <li key={e} className={style.pagList} onClick={()=>paginate(e)} >{e}</li>)}
      </ul>
    </nav>
  )
}
