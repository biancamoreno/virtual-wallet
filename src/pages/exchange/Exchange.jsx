import React, { useState, useEffect } from "react"
import "@css/exchange.css"
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
        placeholder: "SELECIONE"
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
        label: "Trocar"
      }
    ]
  })

  const [canChange, updateCanChange] = useState({
    brita: 0,
    btc: 0
  })

  const [currency, setCurrency] = useState({
    selected: "",
    value: 0
  })

  const [loader, setLoader] = useState({
    loader: false
  })

  const [msg, setMsg] = useState({
    error: ""
  })

  useEffect(() => {
    if (login) {
      updateCanChange({
        brita: login.brita,
        btc: login.btc
      })
    }
  }, [login])

  function toFloat(value) {
    value = value.replace("$ ", "")
    value = value.split(".").join("%")
    value = value.split(",").join(".")
    value = parseFloat(value.split("%").join(""))
    return value
  }

  async function onSubmit(values) {
    setLoader({ loader: true })
    let inputValue = toFloat(values.quantity)

    if (canChange[values.currency] >= inputValue) {
      login[values.currency] -= inputValue
      login.real = login.real + quotations[values.currency].sell * inputValue
      await store.dispatch(updateUser(login))
      setMsg({ error: "" })
      document.getElementsByName("quantity")[0].value = ""
    } else {
      setMsg({ error: "Saldo insuficiente" })
    }
    setLoader({ loader: false })
  }

  function handleInput(values) {
    let name = values.currentTarget.name,
      value = values.currentTarget.value

    if (name === "quantity") {
      value = toFloat(value)
      setCurrency({ value: value })
    } else if (name === "currency") {
      setCurrency({ selected: value })
    }
  }

  return (
    <div className="exchange">
      <h1 className="exchange__title m-t-30">TROCAR</h1>
      <div className="row reverse m-t-30">
        <div className="exchange__can-change">
          <p className="exchange__can-change__title m-b-10">
            Disponível para troca:
          </p>
          <p className="exchange__can-change__item m-b-3">
            ${" "}
            {currency === "btc"
              ? canChange.btc.toLocaleString("pt-BR")
              : currency === "brita"
              ? canChange.brita.toLocaleString("pt-BR")
              : "..."}
          </p>
        </div>
        <div className="exchange__form row">
          <Form
            initialValues={form.initialValues}
            fields={form.fields}
            schema={ExchangeSchema}
            buttons={form.buttons}
            onSubmitForm={onSubmit}
            status={loader.loader}
            handleChange={handleInput}
            clean={true}
          ></Form>
          <div className="exchange__form__value row m-l-20">
            <p>POR</p>
            <div className="value-change m-l-20">
              <p className="m-b-10">
                {currency === "btc"
                  ? "Brita"
                  : currency === "brita"
                  ? "BTC"
                  : "..."}
              </p>
              <p>$ </p>
            </div>
          </div>
        </div>
      </div>
      {msg.error ? (
        <div className="exchange__container">
          <div className="exchange__container__error">
            <MsgError error={msg.error}></MsgError>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Exchange
