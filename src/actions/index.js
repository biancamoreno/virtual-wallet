import db from "@database/db"

/*
  USERS
*/

export function loadUsers() {
  return dispatch => {
    db.users
      .toArray()
      .then(users => {
        dispatch({
          type: "LOAD_USERS",
          payload: users
        })
      })
      .catch(error => console.log(error))
  }
}

export function addUser(name, email, password) {
  return dispatch => {
    const userAdd = { name, email, password, real: 100000, btc: 0, brita: 0 }
    db.users
      .put(userAdd)
      .then(id => {
        dispatch({
          type: "LOAD_USERS",
          payload: Object.assign({}, userAdd, id)
        })
      })
      .catch(error => console.log(error))
  }
}

export function updateUser(user) {
  return dispatch => {
    db.users
      .put(user)
      .then(id => {
        dispatch({
          type: "ADD_USER",
          payload: Object.assign({}, user)
        })
      })
      .catch(error => console.log(error))
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

/*
  TRANSACTIONS
*/

export function addTransfer(
  userId,
  type,
  date,
  currencyBuy,
  valueBuy,
  currencySell,
  valueSell
) {
  return dispatch => {
    const transferAdd = {
      userId: userId,
      type: type,
      date: date,
      currencyBuy: currencyBuy,
      valueBuy: valueBuy,
      currencySell: currencySell,
      valueSell: valueSell
    }
    db.transfers
      .add(transferAdd)
      .then(id => {
        dispatch({
          type: "ADD_TRANSFER",
          payload: Object.assign({}, transferAdd, id)
        })
      })
      .catch(error => console.log(error))
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

/*
  QUOTATIONS
*/
export function addQuotations(quotations) {
  return dispatch => {
    dispatch({
      type: "ADD_QUOTATIONS",
      payload: Object.assign({}, quotations)
    })
  }
}
