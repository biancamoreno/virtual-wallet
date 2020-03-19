import React from "react"
import Helmet from "react-helmet"
import { Router, Switch, Route } from "react-router-dom"
import Login from "@pages/login/Login"
import Home from "@pages/home/Home"
import "@css/app.css"
import history from "@utils/history"

export default function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Helmet>
          <title>Virtual Wallet - Stone</title>
          <meta
            name="description"
            content="Desafio técnico Carteira Virtual desenvolvido para a Stone"
          />
          <link rel="icon" href="assets/images/favicon.ico" />
        </Helmet>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </div>
    </Router>
  )
}
