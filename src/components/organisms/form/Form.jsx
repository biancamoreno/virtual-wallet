import React from "react"
import "@css/form.css"
import Button from "@atoms/button/Button"
import Label from "@atoms/label/Label"
import MsgError from "@atoms/msg-error/MsgError"
import { Formik, Form as FormBuilder, Field } from "formik"
import classNames from "classnames"

class Form extends React.Component {
  renderFields(field, errors, touched) {
    let classes = classNames("form__field m-b-10", {
      "form__field--error": errors[field.name] && touched[field.name]
    })
    return (
      <div className={classes} key={field.name}>
        {field.label ? (
          <Label label={field.label} name={field.name}></Label>
        ) : null}
        <Field
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
        />
        {errors[field.name] && touched[field.name] ? (
          <MsgError error={errors[field.name]}></MsgError>
        ) : null}
      </div>
    )
  }

  renderButtons(button, index) {
    return (
      <Button
        type={button.type}
        classes={button.classes + " m-t-10"}
        disabled={button.disabled}
        label={button.label}
        key={index}
      ></Button>
    )
  }

  render() {
    return (
      <div className="form">
        <Formik
          validateOnChange
          initialValues={this.props.initialValues}
          validationSchema={this.props.loginSchema}
          onSubmit={values => this.props.onSubmitForm(values)}
        >
          {({ errors, touched }) => (
            <FormBuilder>
              {this.props.fields.map(field =>
                this.renderFields(field, errors, touched)
              )}
              {this.props.buttons.map(this.renderButtons)}
            </FormBuilder>
          )}
        </Formik>
      </div>
    )
  }
}

export default Form
