import React from "react"
import "@css/nav-menu.css"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/core/styles"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import MenuIcon from "@material-ui/icons/Menu"
import history from "@utils/history"
import { storeUser } from "@actions"
import store from "@store"

const options = ["Início", "Transações", "Comprar", "Vender", "Trocar", "Sair"]
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}))
const ITEM_HEIGHT = 48

function NavMenu() {
  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(null)
    switch (index) {
      case 0: 
        history.push("/")
        break
      case 1: 
        history.push("/transacoes")
        break
      case 2: 
        history.push("/comprar")
        break
      case 3: 
        history.push("/vender")
        break
      case 4:
        history.push("/trocar")
        break
      case 5:
        store.dispatch(storeUser({}))
        history.push("/login")
        break
      default: 
        history.push("/")
    }
  }

  return (
    <div className="nav-menu">
      <div className={classes.root}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch"
            }
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={event => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  )
}

export default NavMenu
