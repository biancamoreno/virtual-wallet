import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

const INITIAL_STATE = {
  data: {}
}

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, data: { ...state.data, user: action.payload } }
    case "ADD_QUOTATIONS":
      return { ...state, data: { ...state.data, quotations: action.payload } }
    case "ADD_TRANSFERS":
      return { ...state, data: { ...state.data, transfers: action.payload } }
    case "ADD_TRANSFER":
      return {
        ...state,
        data: {
          ...state.data,
          transfers: [...state.data.transfers, action.payload]
        }
      }
    default:
      return state
  }
}
const store = createStore(wallet, applyMiddleware(thunk))

export default store
