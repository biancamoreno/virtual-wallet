import React, { useState, useEffect } from "react"
import "@css/buy.css"
import { useSelector } from "react-redux"
import history from "@utils/history"
import Form from "@organisms/form/Form"
import * as Yup from "yup"
import MsgError from "@atoms/msg-error/MsgError"
import { updateUser, addTransfer } from "@actions"
import store from "@store"

const BuySchema = Yup.object().shape({
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
      updateCanBuy({
        brita: login.real / quotations.brita.buy,
        btc: login.real / quotations.btc.buy
      })
    }
  }, [login])

  async function onSubmit(values) {
    setLoader({ loader: true })
    let inputValue = values.quantity.replace("$", "")
    inputValue = inputValue.split(".").join("%")
    inputValue = inputValue.split(",").join(".")
    inputValue = parseFloat(inputValue.split("%").join(""))

    if (canBuy[values.currency] >= inputValue) {
      login[values.currency] += inputValue
      login.real = login.real - quotations[values.currency].buy * inputValue
      await store.dispatch(updateUser(login))
      await store.dispatch(
        addTransfer(
          login.id,
          "buy",
          new Date(),
          values.currency,
          inputValue,
          "",
          0
        )
      )
      setMsg({ error: "" })
    } else {
      setMsg({ error: "Saldo insuficiente" })
    }
    setLoader({ loader: false })
  }
  return (
    <div className="buy">
      <h1 className="buy__title m-t-30">COMPRAR</h1>
      <div className="row reverse m-t-30">
        <div className="buy__can-buy">
          <p className="buy__can-buy__title m-b-10">Disponível para compra:</p>
          <p className="buy__can-buy__item m-b-3">
            BTC: $&nbsp;{canBuy.btc.toLocaleString("pt-BR")}
          </p>
          <p className="buy__can-buy__item  m-b-3">
            Brita: $&nbsp;{canBuy.brita.toLocaleString("pt-BR")}
          </p>
        </div>
        <Form
          initialValues={form.initialValues}
          fields={form.fields}
          schema={BuySchema}
          buttons={form.buttons}
          onSubmitForm={onSubmit}
          status={loader.loader}
          clean={true}
        ></Form>
      </div>
      {msg.error ? (
        <div className="buy__container">
          <div className="buy__container__error">
            <MsgError error={msg.error}></MsgError>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Buy
