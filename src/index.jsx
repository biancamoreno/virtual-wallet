/* eslint-disable no-undef */
import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { Provider } from "react-redux"
import store from "@store"
import { loadUsers } from "@actions"

store.dispatch(loadUsers("LOAD_USERS"))

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <App />
      </AppContainer>
    </Provider>,
    document.getElementById("root")
  )
}

serviceWorker.unregister()

render()

if (module.hot) {
  module.hot.accept("./App", () => {
    render()
  })
}
