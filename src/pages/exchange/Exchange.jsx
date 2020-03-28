import React, { useState, useEffect } from "react"
import "@css/exchange.css"
import { useSelector } from "react-redux"
import history from "@utils/history"
import Form from "@organisms/form/Form"
import * as Yup from "yup"
import MsgError from "@atoms/msg-error/MsgError"
import Icon from "@material-ui/core/Icon"
import { updateUser } from "@actions"
import store from "@store"
import db from "@database/db"

const ExchangeSchema = Yup.object().shape({
  currency: Yup.string()
    .required("Seleção de moeda obrigatória")
    .nullable(),
  quantity: Yup.string()
    .required("Quantidade obrigatória")
    .nullable()
})

function Exchange() {
  db.transfers
        .where(["userId", 1643682])
        .first(transfer => {
          console.log(transfer)
        })
        .catch(error => {
          console.log(error)
          return
        })
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

  const [currency, setCurrency] = useState({
    selected: "",
    inputValue: 0,
    changeFor: "",
    valueChanged: 0
  })

  const [loader, setLoader] = useState({
    loader: false
  })

  const [msg, setMsg] = useState({
    error: ""
  })

  function toFloat(value) {
    value = value.replace("$ ", "")
    value = value.split(".").join("%")
    value = value.split(",").join(".")
    value = parseFloat(value.split("%").join(""))
    return value
  }

  async function onSubmit() {
    setLoader({ loader: true })
    if (login[currency.selected] >= currency.inputValue) {
      login[currency.selected] -= currency.inputValue
      login[currency.changeFor] += currency.valueChanged
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
      value = values.currentTarget.value,
      inputValue = null,
      currencyType,
      changeFor,
      val

    if (name === "currency") {
      currencyType = value.toLowerCase()
      if (currencyType === "btc") changeFor = "brita"
      if (currencyType === "brita") changeFor = "btc"
    } else if (name === "quantity") {
      value = toFloat(value)
      inputValue = value
    }

    inputValue = inputValue
      ? inputValue
      : inputValue !== null
      ? inputValue
      : currency.inputValue
    currencyType = currencyType ? currencyType : currency.selected
    changeFor = changeFor ? changeFor : currency.changeFor

    if (!inputValue) val = 0
    else if (currencyType === "btc")
      val = inputValue * quotations.btc.sell * quotations.brita.buy
    else if (currencyType === "brita")
      val = (inputValue * quotations.brita.sell) / quotations.btc.buy
    else val = 0

    setCurrency({
      selected: currencyType,
      inputValue: inputValue,
      valueChanged: val,
      changeFor: changeFor
    })
  }

  return (
    <div className="exchange">
      <h1 className="exchange__title m-t-30">TROCAR</h1>
      <div className="row reverse m-t-30">
        <div className="exchange__form row">
          <div className="exchange__form__container">
            <Form
              initialValues={form.initialValues}
              fields={form.fields}
              schema={ExchangeSchema}
              buttons={form.buttons}
              onSubmitForm={onSubmit}
              status={loader.loader}
              handleChange={handleInput}
            ></Form>
            {msg.error ? (
              <div className="exchange__container">
                <div className="exchange__container__error">
                  <MsgError error={msg.error}></MsgError>
                </div>
              </div>
            ) : null}
          </div>
          <div className="exchange__form__value row m-l-20">
            <Icon>swap_horiz</Icon>
            <div className="value-change">
              <p className="m-b-10">
                {currency.changeFor
                  ? currency.changeFor.toUpperCase()
                  : "Moeda"}
              </p>
              <p>
                $&nbsp;
                {currency.valueChanged
                  ? currency.valueChanged.toLocaleString("pt-BR")
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exchange
