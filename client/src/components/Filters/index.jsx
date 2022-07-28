import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterGames } from "../../redux/actions"
import style from "./Filters.module.css"


export default function Filters() {
  const [activeFilter, setActiveFilter] = useState('None')
  let mapGenres = []
  const dispatch = useDispatch()

  const handleFilter = (filter) => {
    filter === activeFilter ? setActiveFilter('none') : setActiveFilter(filter)
    dispatch(filterGames(filter))
  }

  const genres = useSelector(state => state.genres)

  if (genres.length) {
    mapGenres = genres.map((genre, idx) => <li className={style.filterLi} key={idx} onClick={() => handleFilter(genre.name)}>{genre.name}</li>)
    mapGenres.unshift(<li className={style.filterLi} key={mapGenres.length+1} onClick={() => handleFilter('None')}>None</li>)
    mapGenres.push(<li className={style.filterLi} key={mapGenres.length+1} onClick={() => handleFilter('UserMade')}>UserMade</li>)
    mapGenres.push(<li className={style.filterLi} key={mapGenres.length+1} onClick={() => handleFilter('ApiGame')}>ApiGame</li>)
  }

  return (
    <>
      <h3>Active filter: {activeFilter}</h3>
      <ul className={style.filterUl}>
        {(genres.length && mapGenres) || <h2>Loading..</h2> }
      </ul>
    </>
  )
}



