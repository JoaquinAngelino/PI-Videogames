import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import style from "./Detail.module.css"
import { searchGame } from "../../redux/actions";
import Logo from "../../components/logo"


export default function Detail() {
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(searchGame(id))
  }, [id])
  
  const [game] = useSelector(state => state.games)

  console.log(game)
  let gameGenres = []
  if (game.genres) {
    game.genres.forEach(genre => {
      gameGenres.push(<li>{genre.name} </li>)
    });
  }
  let gamePlatforms = []
  if (game.platforms) {
    game.platforms.forEach(platform => {
      gamePlatforms.push(<li className={style.instructions}>{platform}</li>)
    })
  }

  return (
    <>
      <Logo />
      <div className={style.detailDiv}>
        <h2>{game.name}</h2>
        <div>
          <p>Rating: {game.rating}</p>
          <p>Description: </p>
          <div dangerouslySetInnerHTML={{ __html: game.description }} />
          <p>Genres: </p>
          <ul>
            {gameGenres}
          </ul>
          <p>Platforms: </p>
          <ul>
            {gamePlatforms}
          </ul>
        </div>
        {game.image && <img src={game.image} alt={game.name} />}
      </div>
    </>
  )

}