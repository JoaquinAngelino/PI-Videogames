import React from 'react';
import { useDispatch } from 'react-redux';
import { getGenres, searchGame } from '../../redux/actions';
import { useEffect } from 'react';
import Cards from '../../layoutComponents/Cards';
import HeaderBar from '../../layoutComponents/HeaderBar'
import Logo from "../../components/Logo"
import SideBar from '../../layoutComponents/SideBar';
import style from './Home.module.css'


export default function Home() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getGenres())
    dispatch(searchGame())
    console.log("Ejecutando useEffect() en home")
  })

  return (
    <>
      <Logo />
      <HeaderBar />
      <div className={style.homeContent}>
      <SideBar/>
      <Cards />
      </div>
    </>
  )
};