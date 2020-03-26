import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Form from "@organisms/form/Form"
import MsgError from "@atoms/msg-error/MsgError"
import * as Yup from "yup"
import "@css/login.css"
import logo from "@images/cripto.png"
import db from "@database/db"
import history from "@utils/history"
import { storeUser } from "@actions"
import store from "@store"
import LinkTo from "@atoms/link/Link"

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
  const quotations = useSelector(state => state.data.quotations)
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
      }
    ]
  })

  let [formStates, setStates] = useState({
    loader: false,
    error: ""
  })

  let [login, setLogin] = useState({})

  useEffect(() => {
    if (login.id) {
      store.dispatch(storeUser(login))
      history.push("/")
    }
  }, [login])

  async function getResolve(user) {
    setStates({ error: "" })
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

  function onSubmit(values) {
    if (!quotations) {
      setStates({ error: "Falha nas cotações" })
      return
    }

    setStates({ loader: true })

    db.users
      .where({ email: values.email })
      .first(userEmail => {
        if (userEmail) {
          setStates({ loader: false })
          if (userEmail.password === values.password) getResolve(userEmail)
          else setStates({ error: "E-mail e/ou senha inválido" })
        }
      })
      .catch(error => {
        setStates({ loader: false })
        setStates({ error: "Falha no login, tente novamente" })
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
            schema={LoginSchema}
            buttons={form.buttons}
            onSubmitForm={onSubmit}
            status={formStates.loader}
          ></Form>
          {formStates.error ? (
            <div className="login__form__error">
              <MsgError error={formStates.error}></MsgError>
            </div>
          ) : null}
          <div className="m-t-10">
            <LinkTo
              to="/cadastro"
              text="Não possui cadastro? Cadastre-se"
            ></LinkTo>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
