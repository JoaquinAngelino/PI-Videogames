import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { orderByRating } from '../../redux/actions';
import style from './RatingOrder.module.css'

export default function ScoreOrder() {

  const [order, setOrder] = useState('asc')
  const dispatch = useDispatch()
  
  const handleClick = () => {
    dispatch(orderByRating(order))
    if(order === 'asc'){
      setOrder('des')
    }else{
      setOrder('asc')
    }
  }

  return (
      <p className={style.sortBtn} onClick={() => handleClick()}>Rating: {order}</p>
  )
}