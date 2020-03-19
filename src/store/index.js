import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

const INITIAL_STATE = {
  data: {}
}

function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, data: {...state.data, user: action.payload }}
    default:
      return state
  }
}

const store = createStore(users, applyMiddleware(thunk))

export default store
