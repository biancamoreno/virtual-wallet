import React from "react"
import { useSelector } from "react-redux"
import history from "@utils/history"

function Sell() {
  const login = useSelector(state => state.data.user)
  if (login) {
    if (!login.id) history.push("/login")
  } else history.push("/login")

  return (
    <div className="sell">VENDER</div>
  )
}

export default Sell