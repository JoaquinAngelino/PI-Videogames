const { Router } = require('express');
const {Videogame, Genre} = require("../db")
const axios = require("axios");
const { findById } = require('../tools');

const router = Router();

// ------------------------------------
router.get('/videogames/:idVideogame', (req, res)=>{
  const {idVideogame} = req.params
  const finded = findById(idVideogame)

  return res.send("No id given")
})

// ------------------------------------
router.get('/videogames', (req, res)=>{
  const {name} = req.query
  if(!name){
    return res.send("No query given")
  }
})


// ------------------------------------
router.post('/videogames', (req, res)=>{

})

// ------------------------------------
router.get('/genres', (req, res)=>{

})





module.exports = router;
