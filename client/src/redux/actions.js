import axios from 'axios'
export const FIND_GAME_BY_ID = 'FIND_GAME_BY_ID'
export const FILTER_GAMES = 'FILTER_GAMES'
export const FILTER_BY_USERMADE = 'FILTER_BY_USERMADE'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const ALPHABETIC_ORDER = 'ALPHABETIC_ORDER'
export const FIND_All_GAMES = 'FIND_All_GAMES'
export const GET_GENRES = 'GET_GENRES'


export const searchGame = (id) => {
  if (typeof id === 'undefined') {
    return async function (dispatch) {
      let r = await axios.get(`http://localhost:3001/videogames`)
      return dispatch({ type: FIND_All_GAMES, payload: r.data })
    }
  }
  if (isNaN(Number(id))) {
    return async function (dispatch) {
      let r = await axios.get(`http://localhost:3001/videogames?name=${id}`)
      return dispatch({ type: FIND_GAME_BY_ID, payload: r.data })
    }
  }
  else {
    return async function (dispatch) {
      let r = await axios.get(`http://localhost:3001/videogame/${id}`)
      return dispatch({ type: FIND_GAME_BY_ID, payload: r.data })
    }
  }
}

export const filterGames = (genre) => {
  return function (dispatch) {
    return dispatch({ type: FILTER_GAMES, payload: genre })
  }
}

export const alphabeticOrder = (ord) => {
  return function (dispatch) {
    return dispatch({ type: ALPHABETIC_ORDER, payload: ord })
  }
}

export const orderByRating = (ord) => {
  return function (dispatch) {
    return dispatch({ type: ORDER_BY_RATING, payload: ord })
  }
}

export const getGenres = () => {
  return async function (dispatch) {
    let r = await axios.get(`http://localhost:3001/genres`)
    return dispatch({ type: GET_GENRES, payload: r.data })
  }
}
