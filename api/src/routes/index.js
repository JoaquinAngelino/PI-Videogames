const { Router } = require('express');
const { Videogame, Genre } = require("../db")
const axios = require("axios");
const { findById, getAllGames, findByName, loadGenres, postGame } = require('../tools');
const apiKey = process.env.API_KEY

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
  const result = await findByName(name)
  res.json(result)
})

// ------------------------------------
// ------------------------------------
router.post('/videogames', async (req, res) => {
  const {
    name,
    image,
    rating,
    released,
    platforms,
    genres,
    description
  } = req.body
  if (name && description && platforms) {
    const created = await postGame({ name, image, rating, released, platforms, genres, description })
    return res.send(created)
  }
  return res.status(400).send({ message: "Missing Name, Description or Platforms" })
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
