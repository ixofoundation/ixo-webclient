import React from 'react'
import { StyledButton } from './Button.styles'

interface Props {
  active?: boolean
  size?: 'big' | 'medium' | 'small'
  onClick?: () => void
  children?: React.ReactNode
}

const Button: React.FC<Props> = ({
  active,
  size,
  onClick,
  children,
  ...rest
}): JSX.Element => {
  const handleClick = (): void => {
    onClick && onClick()
  }
  return (
    <StyledButton active={active} size={size} {...rest} onClick={handleClick}>
      {children}
    </StyledButton>
  )
}

export default Button
