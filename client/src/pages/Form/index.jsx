import React from "react";
import CtrlForm from "./CtrlForm";
import style from './Form.module.css'

export default function FormPage() {

  return (
    <div className={style.formContainer}>
      <div className={style.form}>
        <h1>Create your own recipe.</h1>
        <CtrlForm />
      </div>
    </div>
  )
}