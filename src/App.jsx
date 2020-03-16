import React from "react"
import Helmet from "react-helmet"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from '@pages/login/Login';
import "@css/app.css";

function App() {
  return (
    <Router>
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
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
