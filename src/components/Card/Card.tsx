// Card.tsx
import { FlexBox, HTMLDivProps } from 'components/App/App.styles'
import { Title } from 'components/Text'
import React, { HTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

export interface CardProps extends HTMLDivProps {
  title?: string
  children: ReactNode
}

const CardWrapper = styled.div<CardProps>`
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  background-color: ${({ backgroundColor }) => backgroundColor || '#0C3549'};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.01);
  padding: 16px;
  box-sizing: border-box;
`

export const Card: React.FC<CardProps> = ({ children, title, ...props }) => {
  return (
    <CardWrapper {...props}>
      <FlexBox>
        <Title color='white'>{title}</Title>
      </FlexBox>
      {children}
    </CardWrapper>
  )
}
