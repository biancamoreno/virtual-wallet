import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useTheme } from "@material-ui/core/styles"

const SimpleModal = (props) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const { onClose, action, open } = props

  const handleCancel = () => {
    onClose()
  }

  const handleOk = () => {
    onClose(true)
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleCancel}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Tem certeza que deseja " + action + " ?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleOk} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SimpleModal