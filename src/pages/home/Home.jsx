import React from "react"
import { useSelector } from "react-redux"
import history from "@utils/history"

function Home() {

  const login = useSelector(state => state.data)
  if (!login.id) history.push("/login")

  return (
    <div className="home container">
      oi
    </div>
  )
}

export default Home
