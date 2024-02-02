// Card.tsx
import { Flex, Text } from '@mantine/core'
import { HTMLDivProps } from 'components/App/App.styles'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

export interface CardProps extends HTMLDivProps {
  title?: string
  children: ReactNode
  backgroundImage?: string
  icon?: ReactNode
}

const CardWrapper = styled.div<CardProps>`
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  background-color: ${({ $backgroundColor }) => $backgroundColor || '#152B3F'};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.01);
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

export const Card: React.FC<CardProps> = ({ children, title, icon, ...props }) => {
  return (
    <CardWrapper {...props}>
      <Flex align='center'>
        <Text h='100%' c='white' size='24px'>
          {icon}
        </Text>
        <Text fw='bolder' size='24px' c='white' ml={6}>
          {title}
        </Text>
      </Flex>
      {children}
    </CardWrapper>
  )
}
