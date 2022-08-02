import axios from "axios"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import styles from "./CtrlForm.module.css"


export default function CtrlForm() {

  const allGames = useSelector(state => state.allGames)
  const allNames = allGames.map(game => game.name.toLowerCase())
  const [error, setError] = useState({})

  const [input, setInput] = useState({
    name: "",
    description: "",
    rating: 0,
    platforms: [],
    image: "",
    genres: [],
    released: ""
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
      error.name = 'The name of the game is required'
    } else if (input.name.length < 4 || input.name.length > 16) {
      error.name = 'The name must have between 4 and 16 characters'
    }
    if (!input.description) {
      error.description = 'The description of the game is required'
    } else if (input.description.length < 10 || input.description.length > 500) {
      error.description = 'The description must have between 10 and 500 characters'
    }
    if (input.rating < 0 || input.rating > 5) {
      error.rating = 'Must be a float between 0 and 5'
    }
    if (input.image) {
      if (input.image !== "" && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
        error.image = "Image must be a URL"
      }
    }
    if (!input.released) {
      error.released = "The released date is required"
    } else if (Date.parse(input.released) < Date.parse("1952-01-01") || Date.parse(input.released) > Date.now()) {
      error.released = "Invalid date"
    }
    if (input.platforms.length < 1) {
      console.log("input plat.length < 1")
      error.platforms = "Select at least one platform"
    }
    if (input.genres.length < 1) {
      error.genres = "Select at least one genre"
      console.log("input genre.length < 1")
    }
    console.log("\n")
    return error
  }

  const handleSelectGenre = (e) => {
    const change = input.genres.includes(e.target.name) ? input.genres.filter(el => el !== e.target.name) : [...input.genres, e.target.name]
    setInput({
      ...input,
      genres : change
    })
    console.log(input)
    setError(validate({
      ...input,
      genres: change
    }))
  }
  const handleSelectPlatform = (e) => {
    const change = input.platforms.includes(e.target.name) ? input.platforms.filter(el => el !== e.target.name) : [...input.platforms, e.target.name]
    setInput({
      ...input,
      platforms: change
    })
    setError(validate({
      ...input,
      platforms: change
    }))
  }


  const postGame = async (data) => {
    const res = await axios.post("http://localhost:3001/videogame", data)
    console.log(res.data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (error.name || error.description || error.released || error.rating || error.image || input.name === "" || input.description === "" || input.platforms.length < 1 || input.genres.length < 1 || input.released === "") {
      alert('Some fields may be wrong')
      return
    }
    let nameInput = input.name.toLowerCase()
    let result = allNames.includes(nameInput)
    if (result) {
      alert('The name is alredy used')
    } else {
      postGame(input)
      alert('Game created successfully')
      window.location.reload()
    }
  }

  return (
    <form action="">
      <label >Name: <span className={styles.error}>* {error.name ? error.name : ""}</span> </label>
      <input type="text" name="name" value={input.name} onChange={(e) => handleChange(e)} />

      <label >Description: <span className={styles.error}>* {error.description ? error.description : ""}</span></label>
      <input type="text" name="description" value={input.description} onChange={(e) => handleChange(e)} />

      <label >Released: <span className={styles.error}>* {error.released ? error.released : ""}</span></label>
      <input type="date" name="released" value={input.released} onChange={(e) => handleChange(e)} />

      <label >Rating: {error.rating && <span className={styles.error}>{error.rating}</span>}</label>
      <input type="number" name="rating" step="0.1" value={input.rating} onChange={(e) => handleChange(e)} />

      <label >Image: {error.image && <span className={styles.error}>{error.image}</span>}</label>
      <input type="url" name="image" placeholder="https://example.com" value={input.image} onChange={(e) => handleChange(e)} />

      <div className={styles.checkList}>
        <label>Platforms: <span className={styles.error}>* {error.platforms ? error.platforms : ""}</span><br></br></label>
        <label >
          <input className={styles.check} type="checkbox" name="PC" onChange={handleSelectPlatform} />
          PC <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="PlayStation 5" onChange={handleSelectPlatform} />
          PlayStation 5 <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="PlayStation 4" onChange={handleSelectPlatform} />
          PlayStation 4 <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="PlayStation 3" onChange={handleSelectPlatform} />
          PlayStation 3 <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="PlayStation 2" onChange={handleSelectPlatform} />
          PlayStation 2 <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Xbox One" onChange={handleSelectPlatform} />
          Xbox One <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Nintendo Switch" onChange={handleSelectPlatform} />
          Nintendo Switch <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="iOS" onChange={handleSelectPlatform} />
          iOS <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Android" onChange={handleSelectPlatform} />
          Android <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Xbox 360" onChange={handleSelectPlatform} />
          Xbox 360 <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="PS Vita" onChange={handleSelectPlatform} />
          PS Vita <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Game Boy Advance" onChange={handleSelectPlatform} />
          Game Boy Advance <br></br>
        </label>
      </div>
      <div className={styles.checkList}>
        <label >Genres: <span className={styles.error}>* {error.genres ? error.genres : ""}</span><br></br></label>
        <label >
          <input className={styles.check} type="checkbox" name="Action" onChange={handleSelectGenre} />
          Action <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Indie" onChange={handleSelectGenre} />
          Indie <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Adventure" onChange={handleSelectGenre} />
          Adventure <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="RPG" onChange={handleSelectGenre} />
          RPG <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Strategy" onChange={handleSelectGenre} />
          Strategy <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Shooter" onChange={handleSelectGenre} />
          Shooter <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Casual" onChange={handleSelectGenre} />
          Casual <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Simulation" onChange={handleSelectGenre} />
          Simulation <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Puzzle" onChange={handleSelectGenre} />
          Puzzle <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Arcade" onChange={handleSelectGenre} />
          Arcade <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Platformer" onChange={handleSelectGenre} />
          Platformer <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Racing" onChange={handleSelectGenre} />
          Racing <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Massively Multiplayer" onChange={handleSelectGenre} />
          Massively Multiplayer <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Sports" onChange={handleSelectGenre} />
          Sports <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Fighting" onChange={handleSelectGenre} />
          Fighting <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Family" onChange={handleSelectGenre} />
          Family <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Board Games" onChange={handleSelectGenre} />
          Board Games <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Educational" onChange={handleSelectGenre} />
          Educational <br></br>
        </label>
        <label >
          <input className={styles.check} type="checkbox" name="Card" onChange={handleSelectGenre} />
          Card <br></br>
        </label>
      </div>
      <button className={styles.btnClass} type="submit" onClick={handleSubmit}>Ready</button>
      <br></br><span className={styles.error}>* Required Field</span>
    </form>
  )
}