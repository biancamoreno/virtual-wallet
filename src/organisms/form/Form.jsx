import React from "react"
import "../../assets/styles/css/form.css"
import Button from "../../atoms/button/Button"
import Field from "../../molecules/field/Field"

class Form extends React.Component {
  renderFields(field, index) {
    return (
      <Field
        label={field.label}
        name={field.name}
        type={field.type}
        error={field.error}
        placeholder={field.placeholder}
        handleInput={(name, value) => field.handleInput(name, value).bind(this)}
        key={index}
      ></Field>
    )
  }

  renderButtons(button, index) {
    return (
      <Button
        type={button.type}
        classes={button.classes}
        disabled={button.disabled}
        label={button.label}
        handleClick={button.handleClick().bind(this)}
        key={index}
      ></Button>
    )
  }

  render() {
    return (
      <div className="form">
        {this.props.fields.map(this.renderFields)}
        {this.props.buttons.map(this.renderButtons)}
      </div>
    )
  }
}

export default Form
