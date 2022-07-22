import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css'

export default function Card({id, name, image, rating, genres }) {

  let gameGenres = []
  genres.forEach((genre, idx) => {
    gameGenres.push(<li key={idx} className={style.cardLi}>{genre.name} </li>)
  });
  return (
    <Link to={"/detail/" + id}>
      <div className={style.card}>
        <img className={style.cardImg} src={image} alt={name} />
        <h2 className={style.cardTitle}>{name}</h2>
        <div className={style.recuadro}>
          <p className={style.cardText}>Rating: {rating}</p>
          <p className={style.genre}>Genres: </p>
          <ul className={style.cardUl}>
            {gameGenres}
          </ul>
        </div>
      </div>
    </Link>
  )
};