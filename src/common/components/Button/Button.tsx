import React from 'react'
import { StyledButton } from './Button.styles'

interface Props {
  active?: boolean
  variant?: 'primary' | 'secondary'
  size?: 'big' | 'medium' | 'small'
  onClick?: () => void
  children?: React.ReactNode
}

const Button: React.FC<Props> = ({
  active,
  variant = 'primary',
  size = 'medium',
  onClick,
  children,
  ...rest
}): JSX.Element => {
  const handleClick = (): void => {
    onClick && onClick()
  }
  return (
    <StyledButton
      active={active}
      variant={variant}
      size={size}
      {...rest}
      onClick={handleClick}
    >
      {children}
    </StyledButton>
  )
}

export default Button
