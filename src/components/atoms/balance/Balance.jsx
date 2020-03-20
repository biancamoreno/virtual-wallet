import React from "react"
import { useSelector } from "react-redux"
import "@css/balance.css"

function Balance() {
  let login = useSelector(state => state.data.user)
  login = login ? login : { real: "", btc: "", brita: "" }

  return (
    <div className="balance">
      <div className="balance__principal">
        <p className="balance__principal__title">Saldo</p>
        <p className="m-t-5">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(login.real)}
        </p>
      </div>
      <div className="balance__secondary">
        <div className="balance__secondary__item m-r-30">
          <span className="m-r-5">BTC</span>
          <span>{new Intl.NumberFormat().format(login.btc)}</span>
        </div>
        <div className="balance__secondary__item">
          <span className="m-r-5">Brita</span>
          <span>{new Intl.NumberFormat().format(login.brita)}</span>
        </div>
      </div>
    </div>
  )
}

export default Balance
