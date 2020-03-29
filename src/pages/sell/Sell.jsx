import React, { useState } from "react"
import "@css/sell.css"
import { useSelector } from "react-redux"
import history from "@utils/history"
import Form from "@organisms/form/Form"
import * as Yup from "yup"
import MsgError from "@atoms/msg-error/MsgError"
import { updateUser, addTransfer } from "@actions"
import store from "@store"
import SimpleModal from "@organisms/simpleModal/SimpleModal"

const SellSchema = Yup.object().shape({
  currency: Yup.string()
    .required("Seleção de moeda obrigatória")
    .nullable(),
  quantity: Yup.string()
    .required("Quantidade obrigatória")
    .nullable()
})

const Sell = () => {
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

  const [loader, setLoader] = useState({
    loader: false
  })

  const [msg, setMsg] = useState({
    error: ""
  })

  const [valuesSell, setValuesSell] = React.useState({})

  const [open, setOpen] = React.useState(false)

  const toFloat = value => {
    value = value.replace("$ ", "")
    value = value.split(".").join("%")
    value = value.split(",").join(".")
    value = parseFloat(value.split("%").join(""))
    return value
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = async val => {
    setOpen(false)
    if (val) await registerSell(valuesSell)
  }

  const registerSell = async values => {
    let inputValue = toFloat(values.quantity)
    login[values.currency] -= inputValue
    login.real = login.real + quotations[values.currency].sell * inputValue
    await store.dispatch(updateUser(login))
    await store.dispatch(
      addTransfer(
        login.id,
        "sell",
        new Date(),
        "",
        0,
        values.currency,
        inputValue
      )
    )
    setTimeout(() => {
      document.getElementsByName("currency")[0].value = "none"
      document.getElementsByName("quantity")[0].value = ""
    }, 200)
  }

  const onSubmit = async values => {
    setValuesSell(values)
    setLoader({ loader: true })
    let inputValue = toFloat(values.quantity)
    if (login[values.currency] >= inputValue) {
      await handleClickOpen(values)
      setMsg({ error: "" })
    } else {
      setMsg({ error: "Saldo insuficiente" })
    }
    setLoader({ loader: false })
  }

  return (
    <div className="sell">
      <h1 className="sell__title m-t-30">VENDER</h1>
      <div className="row reverse m-t-30">
        <Form
          initialValues={form.initialValues}
          fields={form.fields}
          schema={SellSchema}
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
      <SimpleModal
        open={open}
        onClose={handleClose}
        action={
          "vender " +
          (valuesSell && valuesSell.currency
            ? valuesSell.currency.toUpperCase()
            : "") +
          " " +
          (valuesSell && valuesSell.quantity
            ? valuesSell.quantity.toLocaleString("pt-BR")
            : "")
        }
      ></SimpleModal>
    </div>
  )
}

export default Sell
