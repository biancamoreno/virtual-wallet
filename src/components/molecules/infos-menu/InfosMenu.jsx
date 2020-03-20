import React from "react"
import "@css/infos-menu.css"
import Welcome from '@atoms/welcome/Welcome';
import NavMenu from "@atoms/nav-menu/NavMenu";

class InfosMenu extends React.Component {
  render() {
    return (
      <div className="infos-menu">
        <NavMenu></NavMenu>
        <Welcome></Welcome>
      </div>
    )
  }
}

export default InfosMenu