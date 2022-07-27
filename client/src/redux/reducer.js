import { FIND_GAME_BY_ID, FILTER_BY_GENRE, ORDER_BY_RATING, ALPHABETIC_ORDER, FIND_All_GAMES, FILTER_BY_USERMADE, GET_GENRES, } from './actions'


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
    case FILTER_BY_GENRE:
      if (state.filter === payload || payload === 'none') {
        return { ...state, games: state.allGames, filter: '' }
      }
      let genreFiltered = state.allGames.filter(game => game.genres.some(genre => genre.name === payload))
      return { ...state, filter: payload, games: genreFiltered }
    // ------------------------------------
    // ------------------------------------
    case FILTER_BY_USERMADE:
      if (state.filter === payload || payload === 'none') {
        return { ...state, games: state.allGames, filter: '' }
      }
      let filtered
      if (payload === 'true') {
        filtered = state.allGames.filter(game => game.createByUser)
      } else {
        filtered = state.allGames.filter(game => !game.createByUser)
      }
      return { ...state, filter: payload, games: filtered }
    // ------------------------------------
    // ------------------------------------
    case ORDER_BY_RATING:
      let sortedRating = JSON.parse(JSON.stringify(state.games))
      if (payload === 'asc')
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
      if (payload === 'asc') {
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