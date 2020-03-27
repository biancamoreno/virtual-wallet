import React from "react"
import "@css/form.css"
import Button from "@atoms/button/Button"
import Label from "@atoms/label/Label"
import MsgError from "@atoms/msg-error/MsgError"
import { Formik, Form as FormBuilder, Field } from "formik"
import classNames from "classnames"
import NumberFormat from "react-number-format"

class Form extends React.Component {
  renderFields(field, errors, touched, values, setFieldValue) {
    let classes = classNames("form__field m-b-10", {
      "form__field--error": errors[field.name] && touched[field.name]
    })

    function change(event) {
      setFieldValue(event.target.name, event.target.value)
    }

    return (
      <div className={classes} key={field.name}>
        {field.label ? (
          <Label label={field.label} name={field.name}></Label>
        ) : null}
        {field.type === "select" ? (
          <Field
            as={field.type}
            name={field.name}
            value={values[field.name]}
            onChange={values => {
              change(values)
              this.props.handleChange(values)
            }}
          >
            <option value="none" disabled>
              {field.placeholder}
            </option>
            {field.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </Field>
        ) : field.type === "number" ? (
          <NumberFormat
            name={field.name}
            type="tel"
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"$ "}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChange={change}
            onInput={values => this.props.handleChange(values)}
          />
        ) : (
          <Field
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
          />
        )}
        {errors[field.name] && touched[field.name] ? (
          <MsgError error={errors[field.name]}></MsgError>
        ) : null}
      </div>
    )
  }

  renderButtons(button, index, status) {
    return (
      <Button
        type={button.type}
        classes={button.classes + " m-t-10"}
        disabled={button.disabled}
        label={button.label}
        status={status}
        key={index}
      ></Button>
    )
  }

  render() {
    return (
      <div className="form">
        <Formik
          enableReinitialize
          validateOnChange
          initialValues={this.props.initialValues}
          validationSchema={this.props.schema}
          onSubmit={(values, { resetForm }) => {
            this.props.onSubmitForm(values)
            if (this.props.clean) resetForm({})
          }}
          onInputField={this.props.onInputField}
          handleChange={this.props.handleChange}
        >
          {({ errors, touched, values, setFieldValue, handleChange }) => (
            <FormBuilder handleChange={this.props.handleChange}>
              {this.props.fields.map(field =>
                this.renderFields(
                  field,
                  errors,
                  touched,
                  values,
                  setFieldValue,
                  handleChange
                )
              )}
              {this.props.buttons.map((button, index) =>
                this.renderButtons(button, index, this.props.status)
              )}
            </FormBuilder>
          )}
        </Formik>
      </div>
    )
  }
}

export default Form
