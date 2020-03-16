import React, { Component } from "react"
import Form from "@organisms/form/Form"
import * as Yup from "yup"
import "@css/login.css"
import logo from '@images/cripto.png';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("E-mail obrigatório")
    .nullable(),
  password: Yup.string().required("Senha obrigatória").nullable()
})

class Login extends Component {
  state = {
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
        label: "Entrar",
        handleClick: () => this.onClickBtn
      }
    ]
  }

  onClickBtn = event => {
    console.log("clicou", event.target)
  }

  onInput = event => {
    console.log(event)
  }

  render() {
    return (
      <div className="login container">
        <img className="login__logo m-b-30" alt="Logo" src={logo} />
        <div className="login__form">
          <Form
            initialValues={this.state.initialValues}
            fields={this.state.fields}
            loginSchema={LoginSchema}
            buttons={this.state.buttons}
          ></Form>
        </div>
      </div>
    )
  }
}
export default Login
