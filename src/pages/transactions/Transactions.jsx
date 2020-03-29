import React from "react"
import "@css/transactions.css"
import { useSelector } from "react-redux"
import history from "@utils/history"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Icon from "@material-ui/core/Icon"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper
  }
}))

function Transactions() {
  const classes = useStyles()
  const login = useSelector(state => state.data.user)
  if (login) {
    if (!login.id) history.push("/login")
  } else history.push("/login")

  const transfers = useSelector(state => state.data.transfers)

  return (
    <div className="transactions">
      <h1 className="transactions__title m-t-30">TRANSAÇÕES</h1>
      <List
        className={"transactions__list " + classes.root}
        aria-label="transactions"
      >
        {transfers
          ? transfers.map(transfer => {
              const type = transfer.type,
                currencyBuy = transfer.currencyBuy.toUpperCase(),
                valueBuy = transfer.valueBuy.toLocaleString("pt-BR"),
                currencySell = transfer.currencySell.toUpperCase(),
                valueSell = transfer.valueSell.toLocaleString("pt-BR"),
                options = { year: "numeric", month: "2-digit", day: "2-digit" },
                time = transfer.date
                  .toTimeString("pt-BR")
                  .replace(" GMT-0300 (Brasilia Standard Time)", ""),
                date = transfer.date.toLocaleDateString("pt-BR", options),
                item = {
                  icon:
                    type === "buy"
                      ? "arrow_downward"
                      : type === "sell"
                      ? "arrow_upward"
                      : "swap_vert",
                  primary:
                    type === "buy"
                      ? "Comprou"
                      : type === "sell"
                      ? "Vendeu"
                      : "Trocou",
                  text:
                    type === "buy"
                      ? currencyBuy + " $ " + valueBuy
                      : type === "sell"
                      ? currencySell + " $ " + valueSell
                      : currencySell +
                        " $ " +
                        valueSell +
                        " por " +
                        currencyBuy +
                        " $ " +
                        valueBuy
                }
              return (
                <ListItem
                  button
                  divider
                  className={"transactions__list__item transactions__list__item--" + type}
                >
                  <Icon className="m-r-10">{item.icon}</Icon>
                  <ListItemText
                    primary={item.primary}
                    secondary={date + " " + time}
                  />
                  <span className="item-text">{item.text}</span>
                </ListItem>
              )
            })
          : null}
      </List>
    </div>
  )
}

export default Transactions
