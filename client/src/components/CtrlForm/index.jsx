import axios from "axios"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchRecipe } from "../redux/actions"
import styles from "../styles/CtrlForm.module.css"


export default function CtrlForm() {

  useDispatch(searchRecipe())
  const allRecipes = useSelector(state => state.recipes)
  const allNames = allRecipes.map(e => e.title)
  const [error, setError] = useState({})

  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    analyzedInstructions: "",
    image: "",
    diets: [],
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
    if (!input.title) {
      error.title = 'The title of the recipe is required'
    } else if (!/[a-zA-Z]{4}/.test(input.title)) {
      error.title = 'The title must have only letters and at least 4 characters'
    }
    if (!input.summary) {
      error.summary = 'The summary of the recipe is required'
    } else if (input.summary.length < 10 || input.summary.length > 500) {
      error.summary = 'The summary must have between 10 and 500 characters'
    }
    if (input.healthScore < 0 || input.healthScore > 100) {
      error.healthScore = 'Must be a number between 0 and 100'
    }
    if (input.analyzedInstructions && input.analyzedInstructions.length < 10) {
      error.analyzedInstructions = 'The instructions must have more than 10 characters'
    }
    if (input.image !== "" && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
      error.image = "Image must be a URL"
    }
    console.log(error)
    return error
  }

  const handleSelect = (e) => {
    setInput({
      ...input,
      diets: input.diets.includes(e.target.name) ? input.diets.filter(el => el !== e.target.name) : [...input.diets, e.target.name]
    })
  }

  const postRecipe = async (data) => {
    await axios.post("http://localhost:3001/recipes", data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (error.title || error.summary || error.healthScore || error.analyzedInstructions || error.image) {
      alert('Some fields may be wrong')
      return
    }
    let titleInput = input.title.toLowerCase()
    let result = allNames.includes(titleInput)
    if (result) {
      alert('The title is alredy used')
    } else {
      postRecipe(input)
      alert('Recipe created successfully')
      setInput({
        title: "",
        summary: "",
        healthScore: 0,
        analyzedInstructions: "",
        image: "",
        diets: [],
      })
    }
  }

  return (
    <form action="">
      <label >Title: <span className={styles.error}>*</span> {error.title && <span className={styles.error}>{error.title}</span>}</label>
      <input type="text" name="title" value={input.title} onChange={(e) => handleChange(e)} />

      <label >Summary: <span className={styles.error}>*</span> {error.summary && <span className={styles.error}>{error.summary}</span>}</label>
      <input type="text" name="summary" value={input.summary} onChange={(e) => handleChange(e)} />
      <label >HealthScore: {error.healthScore && <span className={styles.error}>{error.healthScore}</span>}</label>
      <input type="number" name="healthScore" value={input.healthScore} onChange={(e) => handleChange(e)} />
      <label >Instructions: {error.pasoAPaso && <span className={styles.error}>{error.pasoAPaso}</span>}</label>
      <input type="text" name="analyzedInstructions" value={input.analyzedInstructions} onChange={(e) => handleChange(e)} />
      <label >Image: {error.image && <span className={styles.error}>{error.image}</span>}</label>
      <input type="url" name="image" placeholder="https://example.com" value={input.image} onChange={(e) => handleChange(e)} />
      <label >Diets: <br></br></label>
      <div >
      <label >
        <input className={styles.check} type="checkbox" name="vegan" onChange={handleSelect} />
        Vegan <br></br>
      </label>
      <label >
        <input className={styles.check} type="checkbox" name="ketogenic" onChange={handleSelect} />
        Ketogenic <br></br>
      </label>
      <label >
        <input className={styles.check} type="checkbox" name="pescetarian" onChange={handleSelect} />
        Pescarian <br></br>
      </label>
      <label >
        <input className={styles.check} type="checkbox" name="vegetarian" onChange={handleSelect} />
        Vegetarian <br></br>
      </label>
      <label >
        <input  className={styles.check} type="checkbox" name="whole30" onChange={handleSelect} />
        Whole 30 <br></br>
      </label>
      <label >
        <input className={styles.check} type="checkbox" name="primal" onChange={handleSelect} />
        Primal <br></br>
      </label>
      <label >
        <input className={styles.check} type="checkbox" name="paleolithic" onChange={handleSelect} />
        Paleolithic <br></br>
      </label>
      <label >
        <input className={styles.check} type="checkbox" name="dairyFree" onChange={handleSelect} />
        Dairy Free <br></br>
      </label>
      <label >
        <input className={styles.check} type="checkbox" name="glutenFree" onChange={handleSelect} />
        Gluten Free <br></br>
      </label>
      </div>
      <button className={styles.btnClass} type="submit" onClick={handleSubmit}>Ready</button>
      <br></br><span className={styles.error}>* Required Field</span>
    </form>
  )
}