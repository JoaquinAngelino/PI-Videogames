import { FIND_GAME_BY_ID, FILTER_GAMES, ORDER_BY_RATING, ALPHABETIC_ORDER, FIND_All_GAMES, GET_GENRES, } from './actions'


const initialState = {
  games: [],
  filter: '',
  allGames: [],
  genres: [],
}

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FIND_All_GAMES:
      return { ...state, games: payload, allGames: payload }
    // ------------------------------------
    // ------------------------------------
    case FIND_GAME_BY_ID:
      if (!payload) {
        return state
      }
      return { ...state, games: payload }
    // ------------------------------------
    // ------------------------------------
    case FILTER_GAMES:
      if (state.filter === payload || payload === 'None') {
        return { ...state, games: state.allGames, filter: '' }
      }
      if(payload === 'ApiGame'){
        let filtered = state.allGames.filter(game => !game.createdByUser)
        return { ...state, filter: payload, games: filtered }
      }
      if(payload === 'UserMade'){
        let filtered = state.allGames.filter(game => game.createdByUser)
        return { ...state, filter: payload, games: filtered }
      }
      let genreFiltered = state.allGames.filter(game => game.genres.some(genre => genre.name === payload))
      return { ...state, filter: payload, games: genreFiltered }
    // ------------------------------------
    // ------------------------------------
    case ORDER_BY_RATING:
      let sortedRating = JSON.parse(JSON.stringify(state.games))
      if (payload === 'des')
        sortedRating.sort((a, b) => {
          if (a.rating > b.rating) { return 1 }
          if (b.rating > a.rating) { return -1 }
          return 0
        })
      else {
        sortedRating.sort((a, b) => {
          if (a.rating > b.rating) { return -1 }
          if (b.rating > a.rating) { return 1 }
          return 0
        })
      }
      return { ...state, games: sortedRating }
    // ------------------------------------
    // ------------------------------------
    case ALPHABETIC_ORDER:
      let sortedName = JSON.parse(JSON.stringify(state.games))
      if (payload === 'des') {
        sortedName.sort((a, b) => {
          if (a.name > b.name) { return 1 }
          if (b.name > a.name) { return -1 }
          return 0
        })
      } else {
        sortedName.sort((a, b) => {
          if (a.name > b.name) { return -1 }
          if (b.name > a.name) { return 1 }
          return 0
        })
      }
      return { ...state, games: sortedName }
    // ------------------------------------
    // ------------------------------------
    case GET_GENRES:
      return {...state, genres: payload}
    // ------------------------------------
    // ------------------------------------
    default:
      return state
    // ------------------------------------
    // ------------------------------------
  }
}


export default rootReducer