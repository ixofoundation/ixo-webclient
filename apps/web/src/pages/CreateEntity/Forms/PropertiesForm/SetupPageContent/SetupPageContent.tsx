import React, { useMemo } from 'react'
import { Wrapper, Row } from './SetupPageContent.styles'
import { Box, Button } from '@mantine/core'
import Editor from 'components/Editor/Editor'
import { TEntityPageModel } from 'types/entities'
import { EditorJsToBlockNote } from 'components/Editor/utils/editorJsToBlockNote'

interface Props {
  entityType: string
  page: TEntityPageModel
  onChange?: (page: any) => void
  onClose: () => void
}

const SetupPageContent: React.FC<Props> = ({ page, entityType, onChange, onClose }): JSX.Element => {
  const initialPage = useMemo(() => {
    if (Array.isArray(page)) {
      return EditorJsToBlockNote(page)
    }
    return {
      featuredImage: page?.featuredImage ?? '',
      pageTitle: page?.pageTitle ?? '',
      content: page?.content,
    }
  }, [page])

  return (
    <Wrapper>
      <Row className='align-items-center justify-content-end'>
        <Box className='d-flex' style={{ gap: 20 }}>
          <Button size='md' w='160' radius={'sm'} variant='outline' onClick={onClose}>
            Back
          </Button>
          <Button size='md' w='160' radius={'sm'} variant='primary'>
            Continue
          </Button>
        </Box>
      </Row>

      <Row style={{ display: 'block', pointerEvents: onChange ? 'auto' : 'none', padding: 32 }}>
        <Editor editable={true} initialPage={initialPage} />
      </Row>
    </Wrapper>
  )
}

export default SetupPageContent
