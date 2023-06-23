import useCurrentEntity from 'hooks/currentEntity'
import React from 'react'
import { EDITOR_JS_TOOLS } from 'pages/CreateEntity/Forms/PropertiesForm/SetupPageContent/SetupPageContent.constants'
import { createReactEditorJS } from 'react-editor-js'
import styled from 'styled-components'
import { Box } from 'components/App/App.styles'

const ReactEditorJS = createReactEditorJS()

const Wrapper = styled(Box)`
  width: 100%;

  .ce-block {
    &__content {
      max-width: unset;
    }
  }
`

const PageContent: React.FC = (): JSX.Element => {
  const { page = [] } = useCurrentEntity()

  return (
    <Wrapper>
      {page.length > 0 && (
        <ReactEditorJS tools={EDITOR_JS_TOOLS} defaultValue={{ time: new Date().getTime(), blocks: page }} readOnly />
      )}
    </Wrapper>
  )
}

export default PageContent
