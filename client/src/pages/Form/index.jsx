import React, { useEffect } from "react";
import CtrlForm from "../../components/CtrlForm";
import style from './Form.module.css'
import Logo from '../../components/Logo'
import { useDispatch } from "react-redux";
import { searchGame } from "../../redux/actions";

export default function FormPage() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(searchGame())
  })

  return (
    <>
      <Logo />
      <div className={style.formContainer}>
        <h1>Create your own recipe.</h1>
        <CtrlForm />
      </div>
    </>
  )
}