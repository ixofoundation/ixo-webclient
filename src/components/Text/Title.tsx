// Title.tsx
import React, { ReactNode } from 'react'
import styled from 'styled-components'

export interface TitleProps {
  fontSize?: string
  color?: string
  children?: ReactNode
}

const StyledTitle = styled.h1<TitleProps>`
  font-size: ${(props) => props.fontSize || '24px'};
  color: ${(props) => props.color || 'black'};
`

export const Title: React.FC<TitleProps> = ({ children, fontSize, color }) => {
  return (
    <StyledTitle fontSize={fontSize} color={color}>
      {children}
    </StyledTitle>
  )
}
