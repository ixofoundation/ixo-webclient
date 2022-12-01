import React from 'react'
import cx from 'classnames'
import { ModalInputWrapper, IconWrapper, InputWrapper, ErrorLabel } from './ModalInput.styles'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  disabled?: boolean
  preIcon?: JSX.Element
  wrapperClassName?: string
}

const ModalInput: React.FunctionComponent<Props> = ({
  error = undefined,
  disabled = false,
  preIcon = undefined,
  wrapperClassName = '',
  ...rest
}) => {
  return (
    <ModalInputWrapper className={cx({ disabled, error }, wrapperClassName)}>
      {preIcon && <IconWrapper error={!!error}>{preIcon}</IconWrapper>}
      <InputWrapper className={cx({ disabled })} style={preIcon ? { paddingLeft: '30px' } : {}}>
        <input disabled={disabled} {...rest} />
      </InputWrapper>
      <ErrorLabel className={cx({ visible: error }, { invisible: !error })}>{error}</ErrorLabel>
    </ModalInputWrapper>
  )
}

export default ModalInput
