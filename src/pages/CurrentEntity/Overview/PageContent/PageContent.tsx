import useCurrentEntity from 'hooks/currentEntity'
import React from 'react'
// @ts-ignore
import edjsHTML from 'editorjs-html'
import parse from 'html-react-parser'
import { FlexBox } from 'components/App/App.styles'
import styled from 'styled-components'

const edjsParser = edjsHTML()

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

const PageContent: React.FC = (): JSX.Element => {
  const { page = [] } = useCurrentEntity()

  const html = edjsParser.parse({
    blocks:
      page.map((item) => {
        if (item.type === 'heroImage') {
          return { ...item, type: 'image' }
        } else if (item.type === 'pageTitle') {
          return { ...item, type: 'header' }
        }
        return item
      }) ?? [],
  })

  return (
    <Wrapper direction='column' width='100%' my={4}>
      {parse(html.join(''))}
    </Wrapper>
  )
}

export default PageContent
