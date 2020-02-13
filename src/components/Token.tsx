import React, { Component } from 'react'
import './Token.scss'

export interface NamedTokenProps {
  name: string
}

export default class Token extends Component<NamedTokenProps, {}> {
  cssForName(value: string): string {
    return value.toUpperCase()
  }

  render() {
    return (
      <span className={this.cssForName(this.props.name)}>
        {this.props.name}
      </span>
    )
  }
}
