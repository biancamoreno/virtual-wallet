import React, { useState } from "react"
import Form from "@organisms/form/Form"
import MsgError from "@atoms/msg-error/MsgError"
import * as Yup from "yup"
import "@css/signup.css"
import db from "@database/db"
import { addUser } from "@actions"
import logo from "@images/cripto.png"
import history from "@utils/history"
import store from "@store"
import LinkTo from "@atoms/link/Link"

const LoginSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nome obrigatório")
    .nullable(),
  email: Yup.string()
    .email("E-mail inválido")
    .required("E-mail obrigatório")
    .nullable(),
  password: Yup.string()
    .required("Senha obrigatória")
    .nullable()
})

function Signup() {
  const [form] = useState({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    fields: [
      {
        name: "name",
        type: "text",
        label: "Nome",
        placeholder: "INSIRA SEU NOME"
      },
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
        label: "Cadastrar"
      }
    ]
  })

  let [formStates, setStates] = useState({
    loader: false,
    error: ""
  })

  function onSubmit(values) {
    setStates({ loader: true })

    db.users
      .where({ email: values.email })
      .first(user => {
        setStates({ loader: false })

        if (user) setStates({ error: "Este e-mail já possui cadastro" })
        else {
          store.dispatch(addUser(values.name, values.email, values.password))
          setStates({ error: "" })
          history.push("/")
        }
      })
      .catch(error => {
        setStates({ loader: false })
        setStates({ error: "Falha no cadastro, tente novamente" })
      })
  }

  return (
    <div className="signup">
      <div className="container">
        <div className="signup__form">
          <img className="signup__form__logo m-b-30" alt="Logo" src={logo} />
          <Form
            initialValues={form.initialValues}
            fields={form.fields}
            loginSchema={LoginSchema}
            buttons={form.buttons}
            onSubmitForm={onSubmit}
          ></Form>
          {formStates.error ? (
            <div className="signup__form__error">
              <MsgError error={formStates.error}></MsgError>
            </div>
          ) : null}
          <div className="m-t-10">
            <LinkTo
              to="/login"
              text="Já possui cadastro?"
            ></LinkTo>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
