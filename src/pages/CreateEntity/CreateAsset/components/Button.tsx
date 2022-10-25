import { theme } from 'modules/App/App.styles'
import React from 'react'
import styled from 'styled-components'

const buttonColor = (variant: 'primary' | 'secondary'): string => {
  switch (variant) {
    case 'primary':
    default:
      return theme.ixoWhite
    case 'secondary':
      return theme.ixoBlack
  }
}
const buttonBgColor = (
  variant: 'primary' | 'secondary',
  disabled: boolean,
): string => {
  switch (variant) {
    case 'primary':
    default:
      return !disabled ? theme.ixoNewBlue : theme.ixoLightGrey2
    case 'secondary':
      return 'transparent'
  }
}

const StyledButton = styled.button<{
  variant: 'primary' | 'secondary'
  disabled: boolean
}>`
  border: none;
  ${(props): string =>
    props.variant === 'secondary' &&
    `border: 1px solid ${props.theme.ixoNewBlue}`};
  outline: none;
  cursor: pointer;
  border-radius: 8px;
  width: 150px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props): string => buttonColor(props.variant)};
  background: ${(props): string =>
    buttonBgColor(props.variant, props.disabled)};

  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.3px;

  &:focus {
    outline: none;
  }
`

interface Props {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  onClick: () => void
  children?: React.ReactNode
}

const Button: React.FC<Props> = ({
  variant = 'primary',
  disabled = false,
  children,
  onClick,
  ...rest
}): JSX.Element => {
  return (
    <StyledButton
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  )
}

export default Button
