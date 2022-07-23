import React from "react";
import style from "./DetailCard.module.css"

export default function DetailCard({name, image, description, platforms, rating, genres}) {
  
  let gameGenres = []
  if (genres) {
    genres.forEach((genre, idx) => {
      gameGenres.push(<li key={idx}>{genre.name} </li>)
    });
  }

  let gamePlatforms = []
  if (platforms) {
    platforms.forEach((platform, idx) => {
      gamePlatforms.push(<li key={idx} className={style.instructions}>{platform}</li>)
    })
  }

  return (
    <div className={style.detailDiv}>
      <h2>{name}</h2>
      <div>
        <p>Rating: {rating}</p>
        <p>Description: </p>
        <div dangerouslySetInnerHTML={{ __html: description }} />
        <p>Genres: </p>
        <ul>
          {gameGenres}
        </ul>
        <p>Platforms: </p>
        <ul>
          {gamePlatforms}
        </ul>
      </div>
      {image && <img src={image} alt={name} className={style.detailImg}/>}
    </div>
  )
}