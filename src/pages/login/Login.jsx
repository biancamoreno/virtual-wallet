import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Form from "@organisms/form/Form"
import MsgError from "@atoms/msg-error/MsgError"
import * as Yup from "yup"
import "@css/login.css"
import logo from "@images/cripto.png"
import db from "@database/db"
import history from "@utils/history"
import { storeUser, addUser } from "@actions"
import store from "@store"
import classNames from "classnames/bind"

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("E-mail obrigatório")
    .nullable(),
  password: Yup.string()
    .required("Senha obrigatória")
    .nullable()
})

function Login() {
  const loginStore = useSelector(state => state.data)
  if (loginStore.id) history.push("/")

  const [form] = useState({
    initialValues: {
      email: "",
      password: ""
    },
    fields: [
      {
        name: "email",
        type: "email",
        label: "E-mail",
        placeholder: "INSIRA SEU E-MAIL"
      },
      {
        name: "password",
        type: "password",
        label: "Senha",
        placeholder: "INSIRA SUA SENHA"
      }
    ],
    buttons: [
      {
        type: "submit",
        classes: "btn--primary",
        disabled: false,
        label: "Entrar"
        // handleClick: () => onClickBtn
      }
    ]
  })

  let [formStates, setStates] = useState({
    loader: false,
    error: ""
  })

  let [login, setLogin] = useState({
    id: "",
    email: "",
    name: "",
    password: "",
    real: 0,
    btc: 0,
    brita: 0
  })

  // store.dispatch(addUser("bia", "bia@teste.com", "123Teste"))

  async function getResolve(user) {
    setStates({ loader: false })
    setStates({ error: user ? "" : "Cadastro não encontrado" })
    if (user && user.id) {
      setLogin({
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
        real: user.real,
        btc: user.btc,
        brita: user.brita
      })
    }
  }

  useEffect(() => {
    if (login.id) {
      async function fetchData() {
        await store.dispatch(storeUser(login))
        history.push("/")
      }
      fetchData()
    }
  }, [login])

  function onSubmit(values) {
    db.users
      .where({ email: values.email, password: values.password })
      .first(user => {
        getResolve(user)
      })
      .catch(error => {
        getResolve(null)
        console.error(error.stack || error)
      })
  }

  return (
    <div className="login">
      <div className="container">
        <div className="login__form">
          <img className="login__form__logo m-b-30" alt="Logo" src={logo} />
          <Form
            initialValues={form.initialValues}
            fields={form.fields}
            loginSchema={LoginSchema}
            buttons={form.buttons}
            onSubmitForm={onSubmit}
          ></Form>
          {formStates.error ? (
            <div className="login__form__error">
              <MsgError error={formStates.error}></MsgError>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Login
