import React from "react";
import style from "./DetailCard.module.css"
import notAvaiable from "../Card/img_not_avaiable.bmp"

export default function DetailCard({name, image, description, platforms, rating, genres, released}) {
  
  let gameGenres = []
  if (genres) {
    genres.forEach((genre, idx) => {
      gameGenres.push(<li key={idx}>{genre.name} </li>)
    });
  }

  let gamePlatforms = []
  if (platforms) {
    platforms.forEach((platform, idx) => {
      gamePlatforms.push(<li key={idx}>{platform}</li>)
    })
  }

  return (
    <div className={style.detailDiv}>
      <h2>{name}</h2>
      <div>
        <p><strong>Rating:</strong> {rating}</p>
        <p><strong>Description:</strong></p>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <p><strong>Released:</strong> {released}</p>
        <p><strong>Genres:</strong> </p>
        <ul>
          {gameGenres}
        </ul>
        <p><strong>Platforms:</strong> </p>
        <ul>
          {gamePlatforms}
        </ul>
      </div>
      <img src={image ? image : notAvaiable } alt={name} className={style.detailImg}/>
    </div>
  )
}