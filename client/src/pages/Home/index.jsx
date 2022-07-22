import React from 'react';
import Cards from '../../components/Cards';
import HeaderBar from '../../components/HeaderBar'
// import style from './Home.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchGame } from '../../redux/actions';
import Logo from "../../components/Logo"


export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(searchGame())
  })

  return (
    // <div className={style.HomeContainer}>
    <>
      <Logo />
      <HeaderBar />
      {/* <SideBar/> */}
      <Cards />
    </>
    // </div>
  )
};