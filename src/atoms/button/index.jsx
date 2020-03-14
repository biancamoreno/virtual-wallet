import React from "react"
import "../../assets/styles/css/Button.css"

class Button extends React.Component {
  handleClick = event => {
    event.preventDefault()
    this.props.handleClick()
  }

  render() {
    return (
      <button
        type="button"
        className={"btn " + (this.props.disabled ? "" : this.props.classes)}
        onClick={this.handleClick}
        disabled={this.props.disabled}
      >
        {this.props.label}
      </button>
    )
  }
}

export default Button
