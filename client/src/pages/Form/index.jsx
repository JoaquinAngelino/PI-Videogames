import React from "react";
import CtrlForm from "../../components/CtrlForm";
import style from './Form.module.css'
import Logo from '../../components/Logo'

export default function FormPage() {

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