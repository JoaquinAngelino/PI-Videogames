import React, { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterByGenre, getGenres } from "../../redux/actions"
import style from "./Filters.module.css"


export default function Filters() {
  const [activeFilter, setActiveFilter] = useState('none')
  let mapGenres = []
  const dispatch = useDispatch()

  const handleFilter = (filter) => {
    filter === activeFilter ? setActiveFilter('none') : setActiveFilter(filter)
    dispatch(filterByGenre(filter))
  }

  const genres = useSelector(state => state.genres)
  console.log("Genres en filters ", genres)

  if (genres.length) {
    mapGenres = genres.map((genre, idx) => <li className={style.filterLi} key={idx} onClick={() => handleFilter(genre.name)}>{genre.name}</li>)
    mapGenres.push(<li className={style.filterLi} key={mapGenres.lenght+1} onClick={() => handleFilter('none')}>none</li>)
  }


  return (
    <>
      <h3>Active filter: {activeFilter}</h3>
      <ul>
        {genres.length && mapGenres}
      </ul>
    </>
  )
}



