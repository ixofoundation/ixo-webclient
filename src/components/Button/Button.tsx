// Button.tsx
import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface ButtonProps {
  textColor?: string
  borderColor?: string
  buttonBackground?: string
  size?: 'xs' | 'sm' | 'md' | 'l' | 'xl'
  active?: boolean
  children?: ReactNode
}

const getButtonSize = (size: string) => {
  switch (size) {
    case 'xs':
      return {
        padding: '0.15em 0.3em',
        fontSize: '0.15em',
      }
    case 'sm':
      return {
        padding: '0.5em 0.5em',
        fontSize: '0.5em',
      }
    case 'md':
      return {
        padding: '0.5em 1em',
        fontSize: '0.5em',
      }
    case 'l':
      return {
        padding: '1em 2.5em',
        fontSize: '1em',
      }
    case 'xl':
      return {
        padding: '2.5em 3em',
        fontSize: '2.5em',
      }
    default:
      return {
        padding: '1em 1.5em',
        fontSize: '1em',
      }
  }
}

export const StyledButton = styled.button<ButtonProps>`
  font-size: ${(props) => getButtonSize(props.size || 'md').fontSize};
  padding: ${(props) => getButtonSize(props.size || 'md').padding};
  border: 2px solid
    ${({ borderColor, buttonBackground, active }) => (active && borderColor ? borderColor : buttonBackground)};
  border-radius: 3px;
  color: ${({ textColor = 'white' }) => textColor};
  background: ${({ buttonBackground, theme }) => buttonBackground || theme.ixoBlue};
`

export const Button = ({ children, ...rest }: ButtonProps) => {
  return <StyledButton {...rest}>{children}</StyledButton>
}
