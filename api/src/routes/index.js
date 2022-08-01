const { Router } = require('express');
const { Genre } = require("../db")
const { findById, getAllGames, findByName, loadGenres, postGame } = require('../tools');

const router = Router();

// ------------------------------------
// ------------------------------------
router.get('/videogame/:idVideogame', async (req, res) => {
  const { idVideogame } = req.params
  const finded = await findById(idVideogame)
  return finded ? res.json(finded) : res.json(null)
})

// ------------------------------------
// ------------------------------------
router.get('/videogames', async (req, res) => {
  const { name } = req.query

  if (!name) {
    const allGames = await getAllGames()
    return res.json(allGames)
  }
  let result = await findByName(name)
  if(result.length > 15){result = result.slice(0,15)}
  res.json(result)
})

// ------------------------------------
// ------------------------------------
router.post('/videogame', async (req, res) => {
  const {
    name,
    image,
    rating,
    released,
    platforms,
    genres,
    description
  } = req.body
  if (name && description && released) {
    const created = await postGame({ name, image, rating, released, platforms, genres, description })
    if (created){
      return res.json({message: "game created succesfully"})
    }else{
      return res.json({message: "game not creted, db error"})
    }
    
  }
  return res.status(400).send({message: "game not created, missing fields"})
})

// ------------------------------------
// ------------------------------------
router.get('/genres', async (req, res) => {
  if (await Genre.count() === 0) {
    await loadGenres()
  }
  const DBgenres = await Genre.findAll()
  return res.json(DBgenres)
})





module.exports = router;
