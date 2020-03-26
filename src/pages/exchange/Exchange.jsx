import React, { useState, useEffect } from "react"
import "@css/sell.css"
import { useSelector } from "react-redux"
import history from "@utils/history"
import Form from "@organisms/form/Form"
import * as Yup from "yup"
import MsgError from "@atoms/msg-error/MsgError"
import { updateUser } from "@actions"
import store from "@store"

const ExchangeSchema = Yup.object().shape({
  currency: Yup.string()
    .required("Seleção de moeda obrigatória")
    .nullable(),
  quantity: Yup.string()
    .required("Quantidade obrigatória")
    .nullable()
})

function Exchange() {
  const login = useSelector(state => state.data.user)
  if (login) {
    if (!login.id) history.push("/login")
  } else history.push("/login")
  const quotations = useSelector(state => state.data.quotations)

  const [form] = useState({
    initialValues: {
      currency: "none",
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
        label: "Vender"
      }
    ]
  })

  const [canSell, updateCanSell] = useState({
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
      updateCanSell({
        brita: login.brita,
        btc: login.btc
      })
    }
  }, [login])

  async function onSubmit(values) {
    setLoader({ loader: true })
    let inputValue = values.quantity.replace("$ ", "")
    inputValue = inputValue.split(".").join("%")
    inputValue = inputValue.split(",").join(".")
    inputValue = parseFloat(inputValue.split("%").join(""))

    if (canSell[values.currency] >= inputValue) {
      login[values.currency] -= inputValue
      login.real = login.real + (quotations[values.currency].sell * inputValue)
      await store.dispatch(updateUser(login))      
      setMsg({ error: "" })
      document.getElementsByName("quantity")[0].value = ""
    } else {
      setMsg({ error: "Saldo insuficiente" })
    }
    setLoader({ loader: false })
  }
  return (
    <div className="sell">
      <h1 className="sell__title m-t-30">VENDER</h1>
      <div className="row reverse m-t-30">
        <div className="sell__can-sell">
          <p className="sell__can-sell__title m-b-10">Disponível para venda:</p>
          <p className="sell__can-sell__item m-b-3">
            BTC: $ {canSell.btc.toLocaleString("pt-BR")}
          </p>
          <p className="sell__can-sell__item  m-b-3">
            Brita: $ {canSell.brita.toLocaleString("pt-BR")}
          </p>
        </div>
        <Form
          initialValues={form.initialValues}
          fields={form.fields}
          schema={ExchangeSchema}
          buttons={form.buttons}
          onSubmitForm={onSubmit}
          status={loader.loader}
        ></Form>
      </div>
      {msg.error ? (
        <div className="sell__container">
          <div className="sell__container__error">
            <MsgError error={msg.error}></MsgError>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Exchange
