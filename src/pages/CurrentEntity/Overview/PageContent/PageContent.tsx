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
  }
`

const PageContent: React.FC = (): JSX.Element => {
  const { page } = useCurrentEntity()
  const html = edjsParser.parse({ blocks: page ?? [] })

  return (
    <Wrapper direction='column' width='100%' my={4}>
      {parse(html.join(''))}
    </Wrapper>
  )
}

export default PageContent
