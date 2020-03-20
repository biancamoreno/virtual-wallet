import React from "react"
import { useSelector } from "react-redux"
import history from "@utils/history"

function Home() {
  const buttons = [
    {
      label: "Transações",
      url: "/transacoes"
    },
    {
      label: "Comprar",
      url: "/comprar"
    },
    {
      label: "Vender",
      url: "/vender"
    }
  ]

  const login = useSelector(state => state.data.user)
  // function clickBtn(url) {
  //   history.push(url)
  // }

  if (login) {
    if (!login.id) history.push("/login")
  } else history.push("/login")

  return (
    <div className="home">
      {buttons.map((button, index) => (
        <button
          type="button"
          className="home__btn"
          // onClick={clickBtn(button.url)}
          key={index}
        >
          {button.label}
        </button>
      ))}
    </div>
  )
}

export default Home
