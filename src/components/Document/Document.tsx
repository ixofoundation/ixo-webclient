import React, { useEffect } from 'react'
import ImageIcon from 'assets/icons/EvaluateClaim/Image'

import { Container, IconContainer } from './Document.styles'
import { requireCheckDefault } from 'utils/images'

interface Props {
  url: string
  onError: () => void
}

const Document: React.FunctionComponent<Props> = ({ url, onError }) => {
  useEffect(() => {
    const http = new XMLHttpRequest()
    http.open('HEAD', url, false)
    http.send()
    if (http.status === 404) {
      onError()
    }
    // eslint-disable-next-line
  }, [url])

  return (
    <Container href={url} target='_blank'>
      <IconContainer>
        <ImageIcon />
      </IconContainer>
      <img alt='' src={requireCheckDefault(require('assets/images/document-thumb.png'))} />
    </Container>
  )
}

export default Document
