import React from 'react';
import style from './SideBar.module.css'
import { Link } from 'react-router-dom';
import AlphabeticOrder from '../../components/AlphabeticOrder';
import RatingOrder from '../../components/RatingOrder'
import Filters from '../../components/Filters'

export default function SideBar() {

  return (
    <div className={style.SideBarcontainer}>
      <AlphabeticOrder />
      <RatingOrder />
      <Filters/>
      <Link to='/form'><h2>Create your own Game</h2></Link>
    </div>
  )
};