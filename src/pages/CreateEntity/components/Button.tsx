import { theme } from 'modules/App/App.styles'
import React from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

const typographySM = css`
  font-weight: 700;
  font-size: 20px;
`
const typographyMD = css`
  font-weight: 700;
  font-size: 24px;
`

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
const buttonWidthHeight = (
  size: 'lg' | 'md' | 'sm' | 'custom',
  width,
  height,
): [number, number] => {
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
const buttonTypography = (
  size: 'lg' | 'md' | 'sm' | 'custom',
): FlattenSimpleInterpolation | undefined => {
  switch (size) {
    case 'sm':
      return typographySM
    case 'md':
      return typographyMD
    default:
      return undefined
  }
}

const StyledButton = styled.button<{
  variant: 'primary' | 'secondary'
  size: 'lg' | 'md' | 'sm' | 'custom'
  width?: number
  height?: number
  disabled: boolean
}>`
  border: none;
  ${(props): string =>
    props.variant === 'secondary' &&
    `border: 1px solid ${props.theme.ixoNewBlue}`};
  outline: none;
  cursor: pointer;
  border-radius: 8px;

  width: ${(props): string =>
    buttonWidthHeight(props.size, props.width, props.height)[0] + 'px'};
  height: ${(props): string =>
    buttonWidthHeight(props.size, props.width, props.height)[1] + 'px'};

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props): string => buttonColor(props.variant)};
  background: ${(props): string =>
    buttonBgColor(props.variant, props.disabled)};

  ${(props): FlattenSimpleInterpolation | undefined =>
    buttonTypography(props.size)}

  text-transform: uppercase;
  letter-spacing: 0.3px;
  line-height: 100%;

  &:focus {
    outline: none;
  }
`

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'lg' | 'md' | 'sm' | 'custom'
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
      {children}
    </StyledButton>
  )
}

export default Button
