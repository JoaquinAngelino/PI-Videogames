const {Videogame, Genre} = require("../db")
const axios = require("axios");


const findById = async (id) =>{
  const dbSearch = await Videogame.findByPk(id)
  if(dbSearch !== null) {console.log("!!!!!!!!!!!", dbSearch)}

  const apiSearch = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
  if(apiSearch){console.log("1111111111111111",apiSearch)}
}


module.exports = {
  findById,
}