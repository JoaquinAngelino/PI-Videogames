import React from 'react';
import Cards from '../../components/Cards';
import HeaderBar from '../../components/HeaderBar'
import { useDispatch } from 'react-redux';
import { searchGame } from '../../redux/actions';
import Logo from "../../components/Logo"
import { useEffect } from 'react';


export default function Home() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(searchGame())
  })

  return (
    <>
      <Logo />
      <HeaderBar />
      {/* <SideBar/> */}
      <Cards />
    </>
  )
};