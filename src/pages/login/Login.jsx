import React, { Component } from "react"
import Form from '../../organisms/form/Form';

class Login extends Component {
  state = {
    fields: [
      {
        type: "email",
        name: "email",
        label: "E-mail",
        placeholder: "INSIRA SEU E-MAIL",
        error: "obrigatório",
        handleInput: (event) => this.onInput
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
  };

  onClickBtn = event => {
    console.log("clicou", event.target)
  }

  onInput = event => {
    console.log(event);
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form fields={this.state.fields} buttons={this.state.buttons}></Form>
      </div>
    )
  }
}
export default Login
