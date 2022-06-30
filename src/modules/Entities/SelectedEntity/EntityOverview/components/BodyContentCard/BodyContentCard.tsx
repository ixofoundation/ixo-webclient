import React from 'react'
import { Container, ContainerColumn } from './BodyContentCard.styles'
import MarkdownView from 'react-showdown'

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
  const criteriaIndex = content.indexOf('\n', 6)
  const firstParagraph = content.substring(0, criteriaIndex)
  const secondSection = content.substring(criteriaIndex + 1)

  return (
    <>
      <h2>{title}</h2>
      {firstParagraph.length <= 700 ? (
        <Container>
          <img src={image} alt={title} />
          <div className="content">
            <MarkdownView
              markdown={firstParagraph}
              options={{ tables: true, emoji: true }}
            />
          </div>
        </Container>
      ) : (
        <ContainerColumn>
          <img src={image} alt={title} />
          <div className="content">
            <MarkdownView
              markdown={firstParagraph}
              options={{ tables: true, emoji: true }}
            />
          </div>
        </ContainerColumn>
      )}
      <MarkdownView
        markdown={secondSection}
        options={{ tables: true, emoji: true }}
      />
    </>
  )
}

export default BodyContentCard
