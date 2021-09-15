import React from 'react'
import { Container } from './ImageContentCard.styles'
import MarkdownView from 'react-showdown';

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
        <p className="content">
          <MarkdownView
            markdown={content}
            options={{ tables: true, emoji: true }}
          />
        </p>
        {image && <img src={image} alt={title} />}
        <p className="caption">{imageDescription}</p>
      </Container>
    </>
  )
}

export default ImageContentCard
