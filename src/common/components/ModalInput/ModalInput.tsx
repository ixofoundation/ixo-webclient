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
  preIcon?: string | JSX.Element
  placeholder?: string
  value: string | number
  handleChange?: (event: any) => void
  type?: string
  hideLabel?: boolean
  handleKeyDown?: (event: any) => void
  autoFocus?: boolean
  handleClick?: (event: any) => void
}

const ModalInput: React.FunctionComponent<Props> = ({
  invalid = false,
  invalidLabel = '',
  disable = false,
  preIcon,
  placeholder,
  value = '',
  handleChange,
  type = 'string',
  hideLabel = false,
  handleKeyDown,
  autoFocus,
  handleClick,
}) => {
  return (
    <>
      <ModalInputWrapper className={cx({ disable: disable, invalid: invalid })}>
        {preIcon && typeof preIcon === 'string' && (
          <IconWrapper>
            <img src={preIcon} alt={placeholder} />
          </IconWrapper>
        )}
        {preIcon && typeof preIcon !== 'string' && (
          <IconWrapper>{preIcon}</IconWrapper>
        )}
        <InputWrapper
          className={cx({ disable: disable })}
          style={preIcon ? { paddingLeft: '30px' } : {}}
        >
          <input
            name="recipient_address"
            value={value}
            onChange={handleChange}
            placeholder={placeholder ?? 'Some placeholder'}
            type={type}
            readOnly={handleChange === undefined}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            onClick={handleClick}
          />
        </InputWrapper>
      </ModalInputWrapper>
      {!hideLabel && (
        <InvalidLabel
          className={cx({ visible: invalid }, { invisible: !invalid })}
        >
          {invalidLabel}
        </InvalidLabel>
      )}
    </>
  )
}

export default ModalInput
