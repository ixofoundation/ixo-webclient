import React from 'react'
import styled from 'styled-components'

export interface TagProps {
  backgroundColor?: string
  color?: string
}

const StyledTag = styled.div<TagProps>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 24px;
  background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.ixoGrey500};
  color: ${({ color, theme }) => color || theme.ixoGrey700};
  font-size: 0.75em;
  font-weight: bold;
`

export const Tag: React.FC<TagProps> = ({ backgroundColor, color, children }) => {
  return (
    <StyledTag backgroundColor={backgroundColor} color={color}>
      {children}
    </StyledTag>
  )
}
