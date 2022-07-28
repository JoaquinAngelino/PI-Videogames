import axios from "axios"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchGame } from "../../redux/actions"
import styles from "./CtrlForm.module.css"


export default function CtrlForm() {

  useDispatch(searchGame())
  const allGames = useSelector(state => state.allGames)
  const allNames = allGames.map(game => game.name)
  const [error, setError] = useState({})

  const [input, setInput] = useState({
    name: "",
    description: "",
    rating: 0,
    platforms: [],
    image: "",
    genres: [],
  })

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setError(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function validate(input) {
    let error = {}
    if (!input.name) {
      error.nane = 'The name of the game is required'
    } else if (!/[a-zA-Z]{4}/.test(input.name)) {
      error.name = 'The name must have only letters and at least 4 characters'
    }
    if (!input.description) {
      error.description = 'The description of the game is required'
    } else if (input.description.length < 10 || input.description.length > 500) {
      error.description = 'The description must have between 10 and 500 characters'
    }
    if (input.rating < 0 || input.rating > 5) {
      error.rating = 'Must be a float between 0 and 5'
    }
    if (input.image !== "" && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
      error.image = "Image must be a URL"
    }
    return error
  }

  const handleSelect = (e) => {// check
    setInput({
      ...input,
      genres: input.genres.includes(e.target.name) ? input.genres.filter(el => el !== e.target.name) : [...input.Genres, e.target.name]
    })
  }

  const postRecipe = async (data) => {
    await axios.post("http://localhost:3001/videogame", data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (error.name || error.description || error.rating || error.platforms || error.image || input.name === "" || input.description === "") {
      alert('Some fields may be wrong')
      return
    }
    let nameInput = input.name.toLowerCase()
    let result = allNames.includes(nameInput)
    if (result) {
      alert('The name is alredy used')
    } else {
      postRecipe(input)
      alert('Recipe created successfully')
      setInput({
        name: "",
        description: "",
        rating: 0,
        platforms: [],
        image: "",
        genres: [],
      })
    }
  }

  return (
    <form action="">
      <label >Name: <span className={styles.error}>*</span> {error.name && <span className={styles.error}>{error.name}</span>}</label>
      <input type="text" name="name" value={input.name} onChange={(e) => handleChange(e)} />
      <label >Description: <span className={styles.error}>*</span> {error.description && <span className={styles.error}>{error.description}</span>}</label>
      <input type="text" name="description" value={input.description} onChange={(e) => handleChange(e)} />
      <label >Rating: {error.rating && <span className={styles.error}>{error.rating}</span>}</label>
      <input type="number" name="rating" step="0.1" value={input.rating} onChange={(e) => handleChange(e)} />
      <label >Platforms: {error.platforms && <span className={styles.error}>{error.platforms}</span>}</label>
      <input type="text" name="platforms" value={input.platforms} onChange={(e) => handleChange(e)} />
      <label >Image: {error.image && <span className={styles.error}>{error.image}</span>}</label>
      <input type="url" name="image" placeholder="https://example.com" value={input.image} onChange={(e) => handleChange(e)} />
      {/* <div className={styles.checkList}>
        <label>Platforms: <br></br></label>
        <label >
          <input className={styles.check} type="checkbox" name="Action" onChange={handleSelect} />
          Action <br></br>
        </label>
      </div> */}
      <div className={styles.checkList}>
        <label >Genres: <br></br></label>
        <label >
          <input className={styles.check} type="checkbox" name="Action" onChange={handleSelect} />
          Action <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Indie" onChange={handleSelect} />
          Indie <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Adventure" onChange={handleSelect} />
          Adventure <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="RPG" onChange={handleSelect} />
          RPG <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Strategy" onChange={handleSelect} />
          Strategy <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Shooter" onChange={handleSelect} />
          Shooter <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Casual" onChange={handleSelect} />
          Casual <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Simulation" onChange={handleSelect} />
          Simulation <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Puzzle" onChange={handleSelect} />
          Puzzle <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Arcade" onChange={handleSelect} />
          Arcade <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Platformer" onChange={handleSelect} />
          Platformer <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Racing" onChange={handleSelect} />
          Racing <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Massively Multiplayer" onChange={handleSelect} />
          Massively Multiplayer <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Sports" onChange={handleSelect} />
          Sports <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Fighting" onChange={handleSelect} />
          Fighting <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Family" onChange={handleSelect} />
          Family <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Board Games" onChange={handleSelect} />
          Board Games <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Educational" onChange={handleSelect} />
          Educational <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Card" onChange={handleSelect} />
          Card <br></br>
        </label>
      </div>
      <button className={styles.btnClass} type="submit" onClick={handleSubmit}>Ready</button>
      <br></br><span className={styles.error}>* Required Field</span>
    </form>
  )
}