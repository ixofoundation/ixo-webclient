import useCurrentEntity from 'hooks/currentEntity'
import React from 'react'
import { FlexBox } from 'components/App/App.styles'
import styled from 'styled-components'
// @ts-ignore
import edjsParser from 'editorjs-parser'

const Wrapper = styled(FlexBox)`
  & > * {
    width: 100%;
    word-wrap: break-word;
  }

  & h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 3rem;
  }
`

const parser = new edjsParser()

const PageContent: React.FC = (): JSX.Element => {
  const { page = [] } = useCurrentEntity()

  const html = parser.parse({
    blocks:
      page
        .filter((item) => !!item.data)
        .map((item) => {
          if (item.type === 'heroImage') {
            return { ...item, type: 'image' }
          } else if (item.type === 'pageTitle') {
            return { ...item, type: 'header' }
          }
          return item
        }) ?? [],
  })

  return (
    <Wrapper direction='column' width='100%' my={4} dangerouslySetInnerHTML={{ __html: html }}>
      {/* {parse(html.join(''))} */}
    </Wrapper>
  )
}

export default PageContent
