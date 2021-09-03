import * as React from 'react'
import { FormStyles } from '../../../../types/models'
import { InputContainer } from './InputText.styles'

export interface ParentProps {
  type: string
  id?: string
  formStyle: FormStyles
  text?: string
  value?: string
  validation?: string
  step?: string
  defaultValue?: string | number
}
export interface Callbacks {
  onChange?: (event: any) => void
}

export interface Props extends ParentProps, Callbacks {}

const InputText: React.FunctionComponent<Props> = (props) => {
  if (props.formStyle === FormStyles.disabled) {
    return (
      <InputContainer>
        <div className={`${props.formStyle.toLowerCase()}-input`}>
          <input
            className="form-control"
            id={props.id}
            type={props.type}
            placeholder={props.value}
            value={props.text}
            name={props.id}
            disabled={true}
          />
          <p>{props.value}</p>
        </div>
      </InputContainer>
    )
  } else {
    return (
      <InputContainer>
        <div className={`${props.formStyle.toLowerCase()}-input`}>
          <input
            className="form-control"
            id={props.id}
            type={props.type}
            placeholder={props.text}
            onChange={props.onChange}
            name={props.id}
            step={props.step}
            defaultValue={props.defaultValue}
          />
          <p>{props.text}</p>
        </div>
      </InputContainer>
    )
  }
}

export default InputText
