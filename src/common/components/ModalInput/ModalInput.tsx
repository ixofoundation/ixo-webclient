import React from 'react'
import cx from 'classnames'
import {
  ModalInputWrapper,
  IconWrapper,
  InputWrapper,
} from './ModalInput.styles'

interface Props {
  disable?: boolean
  preIcon?: string
  placeholder?: string
  value: string
  handleChange: (event: any) => void
}

const ModalInput: React.FunctionComponent<Props> = ({
  disable = false,
  preIcon,
  placeholder,
  value,
  handleChange,
}) => {
  return (
    <ModalInputWrapper className={cx({ 'disable': disable })}>
      {preIcon && (
        <IconWrapper>
          <img src={preIcon} alt={placeholder} />
        </IconWrapper>
      )}
      <InputWrapper
        className={cx({ 'disable': disable })}
        style={preIcon ? { paddingLeft: '30px' } : {}}
      >
        <input
          value={value}
          onChange={handleChange}
          placeholder={placeholder ?? 'Some placeholder'}
        />
      </InputWrapper>
    </ModalInputWrapper>
  )
}

export default ModalInput
