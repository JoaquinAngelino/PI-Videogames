import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
// import style from "./Detail.module.css"
import { searchGame } from "../../redux/actions";
import Logo from "../../components/Logo"
import DetailCard from "../../components/DetailCard";



export default function Detail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(searchGame(id))
    console.log("aqui")
  }, [id, dispatch])
    
  let game = useSelector(state => state.games[0])
  
  return (
    <>
      <Logo />
      {game ?  <DetailCard 
      key={game.id}
      name={game.name}
      description={game.description}
      image={game.image}
      rating={game.rating}
      genres={game.genres}
      platforms={game.platforms}
      /> : <h2>Loading</h2> }
    </>
  )

}