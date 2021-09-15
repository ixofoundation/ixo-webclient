import React from 'react'
import { Container } from './BodyContentCard.styles'
import MarkdownView from 'react-showdown';

interface Props {
  title: string
  content: string
  image: string
}

const BodyContentCard: React.FunctionComponent<Props> = ({
  title,
  content,
  image,
}) => {
  return (
    <>
      <h2>{title}</h2>
      <Container>
        <img src={image} alt={title} />
        <p className="content">
          <MarkdownView
            markdown={content}
            options={{ tables: true, emoji: true }}
          />
        </p>
      </Container>
    </>
  )
}

export default BodyContentCard
