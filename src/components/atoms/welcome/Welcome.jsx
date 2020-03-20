import React from "react"
import { useSelector } from "react-redux"
import "@css/welcome.css"
import logo from "@images/cripto.png"

function Welcome() {
  let login = useSelector(state => state.data.user)
  login = login ? login : { name: "" }

  return (
    <div className="welcome">
      <img className="welcome__logo m-r-20" alt="Logo" src={logo} />
      <p className="welcome__text">Olá, {login.name.split(" ")[0]}</p>
    </div>
  )
}

export default Welcome
