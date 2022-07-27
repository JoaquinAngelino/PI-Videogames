import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchGame } from '../../redux/actions';
import style from './HeaderBar.module.css'


export default function SearchBar() {

  const [value, setValue] = useState('')

  const dispatch = useDispatch()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (value !== '') {
      dispatch(searchGame(value))
    }
  }

  return (
    <div className={style.SearchBarContainer}>
      <input
        className={style.searchInput}
        placeholder='Search more than 700k games'
        autoComplete="off"
        type="text"
        name="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className={style.btnClass} type="submit" onClick={handleSubmit}>Search</button>
    </div>
  )
};