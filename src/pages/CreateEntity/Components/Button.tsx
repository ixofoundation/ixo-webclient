import React from 'react'
import styled from 'styled-components'
import { theme } from 'components/App/App.styles'
import { Typography } from 'components/Typography'

type TButtonVariant = 'primary' | 'secondary' | 'grey700' | 'grey900'
type TButtonSize = 'lg' | 'md' | 'sm' | 'custom'

const buttonColor = (variant: TButtonVariant): string => {
  switch (variant) {
    case 'primary':
    default:
      return theme.ixoWhite
    case 'secondary':
      return theme.ixoBlack
  }
}
const buttonBgColor = (variant: TButtonVariant, disabled: boolean): string => {
  switch (variant) {
    case 'primary':
    default:
      return !disabled ? theme.ixoNewBlue : theme.ixoLightGrey2
    case 'secondary':
      return 'transparent'
    case 'grey700':
      return theme.ixoGrey700
    case 'grey900':
      return theme.ixoGrey900
  }
}
const buttonWidthHeight = (size: TButtonSize, width: number, height: number): number[] => {
  switch (size) {
    case 'lg':
    case 'md':
      return [150, 48]
    case 'sm':
      return [56, 32]
    case 'custom':
    default:
      return [width, height]
  }
}

const StyledButton = styled.button<{
  variant: TButtonVariant
  size: 'lg' | 'md' | 'sm' | 'custom'
  width?: number
  height?: number
  disabled: boolean
}>`
  border: none;
  ${(props): string => (props.variant === 'secondary' && `border: 1px solid ${props.theme.ixoNewBlue}`) || ''};
  outline: none;
  cursor: pointer;
  border-radius: 8px;

  width: ${(props): string => buttonWidthHeight(props.size, props.width!, props.height!)[0] + 'px'};
  height: ${(props): string => buttonWidthHeight(props.size, props.width!, props.height!)[1] + 'px'};

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props): string => buttonColor(props.variant)};
  background: ${(props): string => buttonBgColor(props.variant, props.disabled)};

  text-transform: uppercase;
  letter-spacing: 0.3px;
  line-height: 100%;

  &:focus {
    outline: none;
  }
`

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant
  size?: TButtonSize
  width?: number
  height?: number
  disabled?: boolean
  onClick: () => void
  children?: React.ReactNode
}

const Button: React.FC<Props> = ({
  variant = 'primary',
  size = 'md',
  width,
  height,
  disabled = false,
  children,
  onClick,
  ...rest
}): JSX.Element => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      width={width}
      height={height}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      <Typography weight='bold' size='xl' color='inherit' style={{ letterSpacing: 0.3 }}>
        {children}
      </Typography>
    </StyledButton>
  )
}

export default Button
