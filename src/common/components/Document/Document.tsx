import React from 'react'
import ImageIcon from 'assets/icons/EvaluateClaim/Image'

import {
  Container,
  IconContainer
} from './Document.styles'

interface Props {
  url: string
}

const Document: React.FunctionComponent<Props> = ({url}) => {
  return (
    <Container href={url}>
      <IconContainer>
          <ImageIcon />
      </IconContainer>
      <img src={ require('assets/images/document-thumb.png') } />
    </Container>
  )
}

export default Document