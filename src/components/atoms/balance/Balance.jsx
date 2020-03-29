import React from "react"
import { useSelector } from "react-redux"
import "@css/balance.css"

const Balance = () => {
  let login = useSelector(state => state.data.user)
  login = login ? login : { real: "", btc: "", brita: "" }

  return (
    <div className="balance">
      {login ? (
        <>
          <div className="balance__principal">
            <p className="balance__principal__title">Saldo</p>
            <p className="m-t-5">R$ {login.real.toLocaleString("pt-BR")}</p>
          </div>
          <div className="balance__secondary">
            <div className="balance__secondary__item m-r-30">
              <span className="m-r-5">BTC</span>
              <span>$ {login.btc.toLocaleString("pt-BR")}</span>
            </div>
            <div className="balance__secondary__item">
              <span className="m-r-5">Brita</span>
              <span>$ {login.brita.toLocaleString("pt-BR")}</span>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Balance
