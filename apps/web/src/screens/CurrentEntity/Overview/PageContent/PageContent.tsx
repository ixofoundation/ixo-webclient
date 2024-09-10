import React from 'react'
import styled from 'styled-components'
import { Box } from 'components/App/App.styles'
import { TEntityPageModel } from 'types/entities'
import Editor from 'components/Editor/Editor'

const Wrapper = styled(Box)`
  width: 100%;
  .codex-editor {
    &__redactor {
      padding-bottom: 50px !important;
    }
  }
  .ce-block {
    &__content {
      max-width: unset;
    }
  }
  .image-tool {
    &__image-picture {
      width: 100%;
    }
    &__caption:empty {
      display: none;
    }
  }
`

interface Props {
  page: TEntityPageModel
}

const PageContent: React.FC<Props> = ({ page }) => {
  return (
    <Wrapper>
      <Editor initialPage={page.content} editable={false} />
    </Wrapper>
  )
}

export default PageContent
