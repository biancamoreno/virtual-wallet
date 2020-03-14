import React from "react"
import "../../assets/styles/css/field.css"
import Input from "../../atoms/input/Input"
import Label from "../../atoms/label/Label"
import MsgError from "../../atoms/msg-error/MsgError"

class Field extends React.Component {
  render() {
    return (
      <div className="field">
        {this.props.label ? (
          <Label label={this.props.label} name={this.props.name}></Label>
        ) : null}
        <Input
          name={this.props.name}
          type={this.props.type}
          error={this.props.error}
          placeholder={this.props.placeholder}
          handleInput={(name, value) =>
            this.props.handleInput(name, value)
          }
        ></Input>
        {this.props.error ? <MsgError error={this.props.error}></MsgError> : null}
      </div>
    )
  }
}

export default Field
