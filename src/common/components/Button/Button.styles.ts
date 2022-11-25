import styled from 'styled-components'
import { theme } from 'modules/App/App.styles'

const colorPairs = {
  primary: [theme.ixoNewBlue, theme.color1],
  secondary: ['#FFFFFF', '#FFFFFF'],
}

const borderColorPairs = {
  primary: [theme.ixoNewBlue, theme.color1],
  secondary: ['#a5adb0', '#FFFFFF'],
}

const buttonWidth = (size: 'big' | 'medium' | 'small' | undefined): string => {
  switch (size) {
    case 'big':
      return '200px'
    case 'medium':
      return '140px'
    case 'small':
      return '100px'
    default:
      return 'auto'
  }
}

const buttonHeight = (size: 'big' | 'medium' | 'small' | undefined): string => {
  switch (size) {
    case 'big':
      return '80px'
    case 'medium':
      return '40px'
    case 'small':
      return '20px'
    default:
      return 'auto'
  }
}

const buttonColor = (variant: 'primary' | 'secondary' = 'primary'): string => {
  switch (variant) {
    case 'primary':
    case 'secondary':
      return 'black'
    default:
      return 'white'
  }
}

const buttonBgColor = (variant: 'primary' | 'secondary' = 'primary', active = false): string => {
  return active ? colorPairs[variant][0] : colorPairs[variant][1]
}

const buttonBorder = (variant: 'primary' | 'secondary', active = false): string => {
  return `1px solid ${active ? borderColorPairs[variant][0] : borderColorPairs[variant][1]}`
}

export const StyledButton = styled.button<{
  active?: boolean
  variant?: 'primary' | 'secondary'
  size?: 'big' | 'medium' | 'small'
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  color: ${(props): string => buttonColor(props.variant)};
  background: ${(props): string => buttonBgColor(props.variant, props.active)};
  border: ${(props): string => buttonBorder(props.variant!, props.active)};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  width: ${(props): string => buttonWidth(props.size)};
  height: ${(props): string => buttonHeight(props.size)};

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${(props): string => colorPairs[props.variant!][0]};
    border-color: ${(props): string => borderColorPairs[props.variant!][0]};
  }
`
