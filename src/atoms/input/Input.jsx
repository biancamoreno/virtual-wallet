import React from "react"
import "../../assets/styles/css/input.css"

class Input extends React.Component {
  render() {
    return (
      <input
        type={this.props.type}
        className={
          "input " +
          this.props.classes +
          (this.props.error ? " input--error" : "")
        }
        name={this.props.name}
        onChange={event =>
          this.props.handleInput(event.target.name, event.target.value)
        }
        value={this.props.value}
        placeholder={this.props.placeholder}
      />
    )
  }
}

export default Input
