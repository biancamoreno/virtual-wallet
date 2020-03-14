import React from "react"
import "../../assets/styles/css/label.css"

class Label extends React.Component {
  render() {
    return (
      <label className="label" htmlFor={this.props.name}>{this.props.label}</label>
    )
  }
}

export default Label
