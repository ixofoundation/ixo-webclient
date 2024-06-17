
import React, { useState } from 'react'
import { TEntityPageModel } from 'types/entities'
import { Wrapper, Row } from './SetupPageContent.styles'
import { Box, Button } from '@mantine/core'
import Editor from 'components/Editor/Editor'
import { Block } from '@blocknote/core'

interface Props {
  entityType: string
  page: TEntityPageModel
  onChange?: (page: any) => void
  onClose: () => void
}

const SetupPageContent: React.FC<Props> = ({ page = {}, entityType, onChange, onClose }): JSX.Element => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const handleChange = (): void => {
    onChange && onChange(blocks)
  }


  return (
    <Wrapper>
      <Row className='align-items-center justify-content-end'>
        <Box className='d-flex' style={{ gap: 20 }}>
          <Button variant="outline" onClick={onClose}>
            Back
          </Button>
          <Button variant='primary' onClick={handleChange}>
            Continue
          </Button>
        </Box>
      </Row>

      <Row style={{ display: 'block', pointerEvents: onChange ? 'auto' : 'none', padding: 32 }}>
        <Editor editable={true} onChange={setBlocks}/>
      </Row>
    </Wrapper>
  )
}

export default SetupPageContent
