import React from 'react'
import cx from 'classnames'
import {
  ModalInputWrapper,
  IconWrapper,
  InputWrapper,
  InvalidLabel,
} from './ModalInput.styles'

interface Props {
  invalid?: boolean
  invalidLabel?: string
  disable?: boolean
  preIcon?: string
  placeholder?: string
  value: string
  handleChange: (event: any) => void
}

const ModalInput: React.FunctionComponent<Props> = ({
  invalid = false,
  invalidLabel = '',
  disable = false,
  preIcon,
  placeholder,
  value,
  handleChange,
}) => {
  return (
    <>
      <ModalInputWrapper className={cx({ disable: disable, invalid: invalid })}>
        {preIcon && (
          <IconWrapper>
            <img src={preIcon} alt={placeholder} />
          </IconWrapper>
        )}
        <InputWrapper
          className={cx({ disable: disable })}
          style={preIcon ? { paddingLeft: '30px' } : {}}
        >
          <input
            value={value}
            onChange={handleChange}
            placeholder={placeholder ?? 'Some placeholder'}
          />
        </InputWrapper>
      </ModalInputWrapper>
      <InvalidLabel>
        {invalid && invalidLabel}
      </InvalidLabel>
    </>
  )
}

export default ModalInput
