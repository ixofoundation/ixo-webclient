import * as React from 'react'
import { FormStyles } from '../../../../types/models'
import { Text } from './TextArea.styles'

export interface ParentProps {
  text?: string
  id: string
  formStyle: FormStyles
}

export interface Callbacks {
  onChange?: (event: any) => void
}

export interface Props extends ParentProps, Callbacks {}

const TextArea: React.FunctionComponent<Props> = (props) => {
  if (props.formStyle === FormStyles.disabled) {
    return (
      <Text>
        <textarea id={props.id} className='form-control' value={props.text} disabled={true} name={props.id} />
      </Text>
    )
  } else {
    return (
      <Text>
        <textarea id={props.id} className='form-control' placeholder={props.text} onChange={props.onChange} />
      </Text>
    )
  }
}

export default TextArea
