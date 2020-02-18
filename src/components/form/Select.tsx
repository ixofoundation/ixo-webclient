import * as React from 'react'
import styled from 'styled-components'

const Input = styled.div`
  margin: 15px 0;
  border-radius: 0;

  p {
    color: ${/* eslint-disable-line */ props => props.theme.fontLightBlue};
    margin-bottom: 10px;
    font-weight: 500;
  }

  & select {
    height: 50px;
    border-left: 0;
    border-radius: 3px;
    border: 1px solid
      ${/* eslint-disable-line */ props => props.theme.lightGrey};
  }
`
export interface ParentProps {
  text?: string
  id: string
  options?: any
}

export interface Callbacks {
  onChange: (event: any) => void
}

export interface Props extends ParentProps, Callbacks {}

export default class Select extends React.Component<Props> {
  generateSelect = (): Array<JSX.Element> => {
    return this.props.options.map((option, index) => {
      return (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      )
    })
  }

  render(): JSX.Element {
    return (
      <Input>
        <p>{this.props.text}</p>
        <select
          defaultValue="default"
          className="custom-select"
          id={this.props.id}
          onChange={this.props.onChange}
        >
          <option value="default" disabled={true}>
            {this.props.text}
          </option>
          {this.generateSelect()}
        </select>
      </Input>
    )
  }
}
