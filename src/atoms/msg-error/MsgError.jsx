import React from "react"
import "../../assets/styles/css/msg-error.css"

class MsgError extends React.Component {
  render() {
    return (
      <p className="msg-error">{this.props.error}</p>
    )
  }
}

export default MsgError