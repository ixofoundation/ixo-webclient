import React from 'react'
import { Container } from './ImageContentCard.styles'

interface Props {
  title: string
  content: string
  image: string
  imageDescription: string
}

const ImageContentCard: React.FunctionComponent<Props> = ({
  title,
  content,
  image,
  imageDescription,
}) => {
  return (
    <>
      <h2>{title}</h2>
      <Container>
        <p className="content">{content}</p>
        <img src={image} alt={title} />
        <p className="caption">{imageDescription}</p>
      </Container>
    </>
  )
}

export default ImageContentCard
