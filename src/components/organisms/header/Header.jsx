import React from "react"
import "@css/header.css"
import Balance from "@atoms/balance/Balance"
import InfosMenu from "@molecules/infos-menu/InfosMenu"

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="p-v-5">
          <InfosMenu></InfosMenu>
        </div>
        <Balance></Balance>
      </header>
    )
  }
}

export default Header
