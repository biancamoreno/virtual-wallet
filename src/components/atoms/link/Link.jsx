import React from "react"
import { Link } from "react-router-dom"
import "@css/link.css"

class LinkTo extends React.Component {
  render() {
    return (
      <>
        { this.props.to ? (
          <Link className="link" to={this.props.to}>{this.props.text}</Link>
        ) : (
          <a className="link" href={this.props.href} title={this.props.text} target={this.props.target}>{this.props.text}</a>
        ) }
      </>
    )
  }
}

export default LinkTo