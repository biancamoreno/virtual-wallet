import React from "react"
import Header from "@organisms/header/Header"
import { Router, Switch, Route } from "react-router-dom"
import Home from "@pages/home/Home"
import Transactions from "@pages/transactions/Transactions"
import Buy from "@pages/buy/Buy"
import Sell from "@pages/sell/Sell"
import history from '@utils/history';
import Exchange from "@pages/exchange/Exchange";

function Main() {
  return (
    <div className="main">
      <Header></Header>
      <div className="container">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/transacoes" component={Transactions}></Route>
            <Route exact path="/comprar" component={Buy}></Route>
            <Route exact path="/vender" component={Sell}></Route>
            <Route exact path="/trocar" component={Exchange}></Route>
            <Route component={Home}></Route>
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default Main
