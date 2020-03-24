import React, { useEffect } from "react"
import Helmet from "react-helmet"
import { Router, Switch, Route } from "react-router-dom"
import Login from "@pages/login/Login"
import Signup from "@pages/signup/Signup"
import "@css/app.css"
import history from "@utils/history"
import Main from "@templates/main/Main"
import axios from "axios"
import { addQuotations } from "@actions/index"
import store from "@store"
// import { useSelector } from "react-redux"

export default function App() {
  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = "0" + month
    if (day.length < 2) day = "0" + day

    return [month, day, year].join("-")
  }

  function getBtcQuotation() {
    return axios.get("https://www.mercadobitcoin.net/api/BTC/ticker/")
  }

  async function getBritaQuotation() {
    let date = formatDate(new Date())
    let requestBrita = await axios.get(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date}'&$format=json`
    )

    if (!requestBrita.data.value[0]) {
      date = formatDate(new Date(new Date().setDate(new Date().getDate()-1)))
      requestBrita = await axios.get(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date}'&$format=json`
      )
    }

    return requestBrita
  }

  function getCurrency() {
    axios.all([getBtcQuotation(), getBritaQuotation()]).then(
      axios.spread(function(btcQuot, britaQuot) {
        const btcData = {
          buy: parseFloat(btcQuot.data.ticker.buy),
          sell: parseFloat(btcQuot.data.ticker.sell)
        }
        const britaData = {
          buy: britaQuot.data.value[0].cotacaoCompra,
          sell: britaQuot.data.value[0].cotacaoVenda
        }
        store.dispatch(addQuotations({ brita: britaData, btc: btcData }))
      })
    )
  }

  useEffect(() => {
    getCurrency()
  }, [])

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
