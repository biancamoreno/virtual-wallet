import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import history from "@utils/history"
import Form from "@organisms/form/Form"
import * as Yup from "yup"
import MsgError from "@atoms/msg-error/MsgError"
import { updateUser } from "@actions"
import store from "@store"

const LoginSchema = Yup.object().shape({
  currency: Yup.string()
    .required("Seleção de moeda obrigatória")
    .nullable(),
  quantity: Yup.string()
    .required("Quantidade obrigatória")
    .nullable()
})

function Buy() {
  const login = useSelector(state => state.data.user)
  if (login) {
    if (!login.id) history.push("/login")
  } else history.push("/login")
  const quotations = useSelector(state => state.data.quotations)

  const [form] = useState({
    initialValues: {
      currency: "btc",
      quantity: ""
    },
    fields: [
      {
        name: "currency",
        type: "select",
        options: [
          {
            value: "btc",
            text: "BTC"
          },
          {
            value: "brita",
            text: "Brita"
          }
        ],
        placeholder: "SELECIONE A MOEDA"
      },
      {
        name: "quantity",
        type: "number",
        placeholder: "INSIRA O VALOR"
      }
    ],
    buttons: [
      {
        type: "submit",
        classes: "btn--primary",
        disabled: false,
        label: "Comprar"
      }
    ]
  })

  const [canBuy, updateCanBuy] = useState({
    brita: 0,
    btc: 0
  })

  const [loader, setLoader] = useState({
    loader: false
  })

  const [msg, setMsg] = useState({
    error: ""
  })

  useEffect(() => {
    if (login) {
      updateCanBuy({ brita: (login.real / quotations.brita.buy), btc: (login.real / quotations.btc.buy)})
    }
  }, [quotations])

  async function onSubmit(values) {
    setLoader({ loader: true })
    if (canBuy[values.currency] >= values.quantity) {
      login[values.currency] = values.quantity
      await store.dispatch(updateUser(login))
      setMsg({ error: "" })
    } else {
      setMsg({ error: "Saldo insuficiente" })
    }
    setLoader({ loader: false })
  }
  return (
    <div className="buy">
      <h1 className="buy__title m-t-20">COMPRAR</h1>
      <div className="buy__can-buy m-v-20">
        <p className="buy__can-buy__title m-b-10">Disponível para compra:</p>
        <p className="buy__can-buy__item">BTC: { canBuy.btc }</p>
        <p className="buy__can-buy__item">Brita: { canBuy.brita }</p>
      </div>
      <Form
        initialValues={form.initialValues}
        fields={form.fields}
        loginSchema={LoginSchema}
        buttons={form.buttons}
        onSubmitForm={onSubmit}
        status={loader.loader}
      ></Form>
      {msg.error ? (
        <div className="signup__form__error">
          <MsgError error={msg.error}></MsgError>
        </div>
      ) : null}
    </div>
  )
}

export default Buy
