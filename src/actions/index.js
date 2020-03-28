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
        type: "LOAD_USERS",
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

// insert user in store
export function storeUser(user) {
  return dispatch => {
    dispatch({
      type: "ADD_USER",
      payload: Object.assign({}, user)
    })
  }
}

export function addTransfer(userId, type, date, currencyBuy, valueBuy, currencySell, valueSell) {
  return dispatch => {
    const transferAdd = { userId, type, date, currencyBuy, valueBuy, currencySell, valueSell }
    db.users.add(transferAdd).then(id => {
      dispatch({
        type: "ADD_TRANSFER",
        payload: Object.assign({}, transferAdd, id)
      })
    })
  }
}

export function storeTransfers(transfers) {
  return dispatch => {
    dispatch({
      type: "ADD_TRANSFERS",
      payload: transfers
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
