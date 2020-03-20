import React from "react"
import "@css/home.css"
import { useSelector } from "react-redux"
import history from "@utils/history"
import Icon from '@material-ui/core/Icon';

function Home() {
  const buttons = [
    {
      label: "Transações",
      url: "/transacoes",
      icon: "swap_vert"
    },
    {
      label: "Comprar",
      url: "/comprar",
      icon: "arrow_downward"
    },
    {
      label: "Vender",
      url: "/vender",
      icon: "arrow_upward"
    }
  ]

  const login = useSelector(state => state.data.user)
  function clickBtn(e, url) {
    e.preventDefault()
    e.stopPropagation()
    history.push(url)
  }

  if (login) {
    if (!login.id) history.push("/login")
  } else history.push("/login")

  return (
    <div className="home">
      {buttons.map((button, index) => (
        <button
          type="button"
          className="home__btn"
          onClick={event => clickBtn(event, button.url)}
          key={index}
        >
          <Icon>{button.icon}</Icon>
          {button.label}
        </button>
      ))}
    </div>
  )
}

export default Home
