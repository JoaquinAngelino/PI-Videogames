const { Videogame, Genre } = require("../db")
const axios = require("axios");
const apiKey = process.env.API_KEY


// ------------------------------------
// ------------------------------------
const DbFindById = async (id) => {
  try {
    const dbSearch = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] }
      }
    })
    const dbFinded = dbSearch.filter(e => e.id === id)
    return (dbFinded.length) ? dbFinded : null
  } catch (err) {
    return null
  }
}

// ------------------------------------
// ------------------------------------
const ApiFindById = async (id) => {
  try {
    const apiSearch = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)).data
    const mapGenres = apiSearch.genres.map(e => { return { name: e.name } })
    const mapPlatforms = apiSearch.platforms.map(e => { return e.platform.name })
    return {
      id: id,
      name: apiSearch.name,
      image: apiSearch.background_image,
      rating: apiSearch.rating,
      released: apiSearch.released,
      platforms: mapPlatforms,
      genres: mapGenres,
      description: apiSearch.description,
    }
  } catch (err) {
    return null
  }
}
// ------------------------------------
// ------------------------------------
// Retorna el Elemento que matchea "id" o null
const findById = async (id) => {
  const db = await DbFindById(id)
  const api = await ApiFindById(id)
  if (!db && !api) { return null }
  return db ? db : [api]
}

// ------------------------------------
// ------------------------------------
// Retorna todos los games de la DB y de la API
const getAllGames = async () => {

  const dbSearch = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [] }
    }
  })

  let links = []
  for (let i = 1; i < 6; i++){
    links.push(axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=${i}`))
  }
  let apiSearch = await Promise.all(links)
  
  let results = []
  apiSearch.forEach(search => {
    results.push(search.data.results)
  })
  results = results.flat()

  results.forEach(game => {
    game.genres = game.genres.map(genre => { return { name: genre.name } })
    game.platforms = game.platforms.map(pf => { return pf.platform.name })
  })

  results = results.map(el => {
    return {
      id: el.id,
      name: el.name,
      image: el.background_image,
      rating: el.rating,
      released: el.released,
      platforms: el.platforms,
      genres: el.genres,
      description: el.description,
      createdByUser: false,
    }
  })
  return results.concat(dbSearch)
}

// ------------------------------------
// ------------------------------------
// REVISAR
const findByName = async (name) => {

  let dbSearch = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [] }
    }
  })
  dbSearch = dbSearch.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))

  let apiSearch = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${apiKey}`)).data.results
  apiSearch.forEach(game => {
    game.genres = game.genres.map(genre => { return genre.name })
    game.platforms = game.platforms.map(pf => { return pf.platform.name })
  })

  apiSearch = apiSearch.map(el => {
    return {
      id: el.id,
      name: el.name,
      image: el.background_image,
      rating: el.rating,
      released: el.released,
      platforms: el.platforms,
      genres: el.genres,
      description: el.description,
    }
  })

  return apiSearch.concat(dbSearch)
}

// ------------------------------------
// ------------------------------------
const loadGenres = async () => {
  const genres = (await axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`)).data.results
  const mapGenres = genres.map(genre => { return { name: genre.name } })
  await Genre.bulkCreate(mapGenres)
}

// ------------------------------------
// ------------------------------------
// Retorna true si creó el game, caso contrario false
const postGame = async (game) => {

  console.log(
    game.name,
    game.image,
    game.rating,
    game.released,
    game.platforms,
    game.genres,
    game.description
  )

  const games = await findByName(game.name)
  const equal = games.filter(el => el.name.toLowerCase() === game.name.toLowerCase())
  if (equal.length) {
    return false
  }
  const created = await Videogame.create({
    name: game.name,
    image: game.image,
    rating: game.rating,
    released: game.released,
    platforms: game.platforms,
    description: game.description,
  })
  if (await Genre.count() === 0) {
    await loadGenres()
  }
  const DBgenres = await Genre.findAll()
  created.addGenres(DBgenres.filter(genre => {
    return game.genres.includes(genre.name)
  }))
  return true
}


module.exports = {
  postGame,
  loadGenres,
  findByName,
  getAllGames,
  DbFindById,
  ApiFindById,
  findById,
}