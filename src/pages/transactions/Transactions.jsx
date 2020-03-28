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

  const transactions = useSelector(state => state.data.transactions)
  console.log(transactions)

  return (
    <div className="transactions">
      <h1 className="transactions__title m-t-30">TRANSAÇÕES</h1>
      <List
        className={classes.root}
        aria-label="transactions"
      >
        <ListItem button divider>
          <Icon className="m-r-10">arrow_downward</Icon>
          <ListItemText primary="Comprou" secondary="Jan 9, 2014" />
          Brita $ x
        </ListItem>
        <ListItem button divider>
          <Icon className="m-r-10">arrow_upward</Icon>
          <ListItemText primary="Vendeu" secondary="Jan 9, 2014" />
          BTC $ x
        </ListItem>
        <ListItem button divider>
          <Icon className="m-r-10">swap_vert</Icon>
          <ListItemText primary="Trocou" secondary="Jan 9, 2014" />
          BTC $ x por BTC $ x
        </ListItem>
        <ListItem button divider>
          <Icon className="m-r-10">arrow_downward</Icon>
          <ListItemText primary="Comprou" secondary="Jan 9, 2014" />
          Brita $ x
        </ListItem>
        <ListItem button divider>
          <Icon className="m-r-10">arrow_upward</Icon>
          <ListItemText primary="Vendeu" secondary="Jan 9, 2014" />
          BTC $ x
        </ListItem>
        <ListItem button divider>
          <Icon className="m-r-10">swap_vert</Icon>
          <ListItemText primary="Trocou" secondary="Jan 9, 2014" />
          BTC $ x por BTC $ x
        </ListItem>
        <ListItem button divider>
          <Icon className="m-r-10">arrow_downward</Icon>
          <ListItemText primary="Comprou" secondary="Jan 9, 2014" />
          Brita $ x
        </ListItem>
        <ListItem button divider>
          <Icon className="m-r-10">arrow_upward</Icon>
          <ListItemText primary="Vendeu" secondary="Jan 9, 2014" />
          BTC $ x
        </ListItem>
        <ListItem button divider>
          <Icon className="m-r-10">swap_vert</Icon>
          <ListItemText primary="Trocou" secondary="Jan 9, 2014" />
          BTC $ x por BTC $ x
        </ListItem>
      </List>
    </div>
  )
}

export default Transactions
