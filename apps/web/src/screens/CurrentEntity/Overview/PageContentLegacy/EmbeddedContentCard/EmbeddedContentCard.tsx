import React from 'react'
import { Container } from './EmbeddedContentCard.styles'
import Embedly from 'components/JsonForm/CustomWidgets/EmbeddedUrlTextBox/Embedly/Embedly'

interface Props {
  title: string
  urls: string[]
}

const EmbeddedContentCard: React.FunctionComponent<Props> = ({ title, urls }) => {
  return (
    <Container>
      <h2>{title}</h2>
      {urls.map((url, index) => {
        return <Embedly key={index} url={url} />
      })}
    </Container>
  )
}

export default EmbeddedContentCard
