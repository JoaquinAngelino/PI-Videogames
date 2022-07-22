import React from 'react';
import style from './SideBar.module.css'
import { useDispatch } from 'react-redux';
import { filterByGenre } from '../../redux/actions';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AlphabeticOrder from './AlphabeticOrder';
import ScoreOrder from './ScoreOrder'



export default function SideBar() {

  const [activeFilter, setActiveFilter] = useState('none')

  const dispatch = useDispatch()
  const handleFilter = (filter) => {
    filter === activeFilter ? setActiveFilter('none') : setActiveFilter(filter)
    dispatch(filterByGenre(filter))
  }

  // const handleClick = () => {
  //   if (window.location.pathname === "/home") {
  //     window.location.reload()
  //   }
  // }

  return (
    <div className={style.SideBarcontainer}>
      <Logo />
      <AlphabeticOrder />
      <ScoreOrder />
      <h2 className={style.filterTitle}>Filters</h2>
      <div className={style.filterUl}>
        <h3 className={style.sideBarH3}>Active filter: {activeFilter}</h3>
        <ul>
          <li className={style.filterList} onClick={() => handleFilter("gluten free")}>Gluten free</li>
        </ul>
      </div>
      <div>
        <Link to='/form'>
          <h2>Create your own Game</h2>
        </Link>
      </div>
    </div>
  )
};