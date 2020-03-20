import React from "react"
import Helmet from "react-helmet"
import { Router, Switch, Route } from "react-router-dom"
import Login from "@pages/login/Login"
import Signup from "@pages/signup/Signup"
import "@css/app.css"
import history from "@utils/history"
import Main from "@templates/main/Main"

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
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/cadastro" component={Signup}></Route>
          <Route exact path="/login" component={Login}></Route>
          {/* <Route exact path="/transacoes" component={Main}></Route>
          <Route exact path="/comprar" component={Main}></Route>
          <Route exact path="/vender" component={Main}></Route> */}
          <Route component={Main}></Route>
        </Switch>
      </div>
    </Router>
  )
}
