import useCurrentEntity from 'hooks/currentEntity'
import React from 'react'
// @ts-ignore
import edjsHTML from 'editorjs-html'
import parse from 'html-react-parser'
import { Box } from 'components/App/App.styles'

const edjsParser = edjsHTML()

const PageContent: React.FC = (): JSX.Element => {
  const { page } = useCurrentEntity()
  const html = edjsParser.parse({ blocks: page ?? [] })

  return <Box>{parse(html.join(''))}</Box>
}

export default PageContent
