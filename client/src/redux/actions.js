import axios from 'axios'
export const FIND_GAME_BY_ID = 'FIND_GAME_BY_ID'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const FILTER_BY_USERMADE = 'FILTER_BY_USERMADE'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const ALPHABETIC_ORDER = 'ALPHABETIC_ORDER'
export const FIND_All_GAMES = 'FIND_All_GAMES'


export const searchGame = (id) => {
  if (typeof id === 'undefined') {
    return async function (dispatch) {
      let r = await axios.get(`http://localhost:3001/videogames`)
      return dispatch({ type: FIND_All_GAMES, payload: r.data })
    }
  }
  if (isNaN(Number(id))) {
    return async function (dispatch) {
      console.log("typeof id === 'NaN'");
      let r = await axios.get(`http://localhost:3001/videogames?name=${id}`)
      return dispatch({ type: FIND_GAME_BY_ID, payload: r.data })
    }
  }
  else {
    return async function (dispatch) {
      console.log("typeof id === 'Number'");
      let r = await axios.get(`http://localhost:3001/videogame/${id}`)
      return dispatch({ type: FIND_GAME_BY_ID, payload: r.data })
    }
  }
}

export const filterByGenre = (genre) => {
  return function (dispatch) {
    return dispatch({ type: FILTER_BY_GENRE, payload: genre })
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

export const filterByUsermade = (usermade) => {
  return function (dispatch) {
    return dispatch({ type: FILTER_BY_USERMADE, payload: usermade })
  }
}