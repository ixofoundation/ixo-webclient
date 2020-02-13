import * as React from 'react'
import styled from 'styled-components'

const Input = styled.div`
  margin: 15px 0;
  border-radius: 0;
  text-transform: uppercase;

  & .input-group-text {
    white-space: normal;
    background: ${/* eslint-disable-line */ props => props.theme.bgMain};
    border: 0;
    color: white;
    padding: 15px 10px;
    font-size: 0.7em;
    border-radius: 0;
    width: 140px;
    justify-content: center;
  }
`

const RadioButton = styled.div`
  padding: 10px 0px 10px 40px;
  text-transform: none;
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

const Radio: React.SFC<Props> = props => {
  const generateButtons = (): JSX.Element => {
    return props.options.map((option, index) => {
      return (
        <RadioButton className="form-group" key={index}>
          <input
            key={index}
            name={props.id}
            value={option.value}
            className="with-gap"
            type="radio"
          />
          <label>{option.label}</label>
        </RadioButton>
      )
    })
  }

  return (
    <Input className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">{props.text}</span>
      </div>
      <div className="form-inline" onChange={props.onChange}>
        {generateButtons()}
      </div>
    </Input>
  )
}

export default Radio
