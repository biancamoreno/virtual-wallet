import React, { useState, useEffect } from "react"
import "@css/buy.css"
import { useSelector } from "react-redux"
import history from "@utils/history"
import Form from "@organisms/form/Form"
import * as Yup from "yup"
import MsgError from "@atoms/msg-error/MsgError"
import { updateUser, addTransfer } from "@actions"
import store from "@store"
import SimpleModal from "@organisms/simpleModal/SimpleModal"

const BuySchema = Yup.object().shape({
  currency: Yup.string()
    .required("Seleção de moeda obrigatória")
    .nullable(),
  quantity: Yup.string()
    .required("Quantidade obrigatória")
    .nullable()
})

const Buy = () => {
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

  const [valuesBuy, setValuesBuy] = React.useState({})

  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (login) {
      updateCanBuy({
        brita: login.real / quotations.brita.buy,
        btc: login.real / quotations.btc.buy
      })
    }
  }, [login])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = async val => {
    setOpen(false)
    if (val) await registerBuy(valuesBuy)
  }

  const toFloat = value => {
    value = value.replace("$ ", "")
    value = value.split(".").join("%")
    value = value.split(",").join(".")
    value = parseFloat(value.split("%").join(""))
    return value
  }

  const registerBuy = async values => {
    const inputValue = toFloat(values.quantity)
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
    setTimeout(() => {
      document.getElementsByName("currency")[0].value = "none"
      document.getElementsByName("quantity")[0].value = ""
    }, 200)
  }

  const onSubmit = async values => {
    setValuesBuy(values)
    setLoader({ loader: true })
    const inputValue = toFloat(values.quantity)
    if (canBuy[values.currency] >= inputValue) {
      await handleClickOpen(values, inputValue)
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
        ></Form>
      </div>
      {msg.error ? (
        <div className="buy__container">
          <div className="buy__container__error">
            <MsgError error={msg.error}></MsgError>
          </div>
        </div>
      ) : null}
      <SimpleModal
        open={open}
        onClose={handleClose}
        action={
          "comprar " +
          (valuesBuy && valuesBuy.currency
            ? valuesBuy.currency.toUpperCase()
            : "") +
          " " +
          (valuesBuy && valuesBuy.quantity
            ? valuesBuy.quantity.toLocaleString("pt-BR")
            : "")
        }
      ></SimpleModal>
    </div>
  )
}

export default Buy
