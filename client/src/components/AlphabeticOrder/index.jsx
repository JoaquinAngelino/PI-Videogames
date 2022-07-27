import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { alphabeticOrder } from '../../redux/actions';
import style from './AlphabeticOrder.module.css'

export default function AlphabeticOrder() {

  const [order, setOrder] = useState('asc')
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(alphabeticOrder(order))
    if (order === 'asc') {
      setOrder('des')
    } else {
      setOrder('asc')
    }
  }

  return (
    <p onClick={() => handleClick()} className={style.sortBtn}>Alph: {order}</p>
  )
}