import React from "react"
import "@css/button.css"

class Button extends React.Component {
  handleClick = event => {
    event.preventDefault()
    this.props.handleClick(event)
  }

  render() {
    return (
      <button
        type={this.props.type}
        className={`btn ${this.props.classes && !this.props.disabled ? this.props.classes : ""} ${this.props.status ? "loading" : ""}`}
        disabled={this.props.disabled}
      >
        {this.props.label}
      </button>
    )
  }
}

export default Button
