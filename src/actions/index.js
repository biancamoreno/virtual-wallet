import db from "@database/db"

export function loadUsers() {
  return dispatch => {
    db.users.toArray().then(users => {
      dispatch({
        type: "LOAD_USERS",
        payload: users
      })
    })
  }
}

export function addUser(name, email, password) {
  return dispatch => {
    const userAdd = { name, email, password, real: 100000, btc: 0, brita: 0 }
    db.users.put(userAdd).then(id => {
      dispatch({
        type: "ADD_USER",
        payload: Object.assign({}, userAdd, id)
      })
    })
  }
}

export function updateUser(user) {
  return dispatch => {
    db.users.put(user).then(id => {
      dispatch({
        type: "ADD_USER",
        payload: Object.assign({}, user)
      })
    })
  }
}

export function storeUser(user) {
  return dispatch => {
    dispatch({
      type: "ADD_USER",
      payload: Object.assign({}, user)
    })
  }
}

export function addQuotations(quotations) {
  return dispatch => {
    dispatch({
      type: "ADD_QUOTATIONS",
      payload: Object.assign({}, quotations)
    })
  }
}
