import React from 'react'

import { CardWrapper } from './Card.styles'

const Card: React.FunctionComponent = ({ children }) => {
  return <CardWrapper>{children}</CardWrapper>
}

export default Card
