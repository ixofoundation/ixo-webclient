import React from 'react'
import { Container } from './BodyContentCard.styles'

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
        <p className="content">{content}</p>
      </Container>
    </>
  )
}

export default BodyContentCard
