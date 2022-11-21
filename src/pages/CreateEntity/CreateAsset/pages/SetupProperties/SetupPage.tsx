import { Box, Typography } from 'modules/App/App.styles'
import { Button } from 'pages/CreateEntity/components'
import React, { useState, useCallback, useRef } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import _ from 'lodash'
import DragDrop from 'editorjs-drag-drop'
import Undo from 'editorjs-undo'
import { TEntityPageModel } from 'types'
import { Wrapper, Row } from './SetupPage.styles'
import { EDITOR_JS_TOOLS } from './SetupPage.constants'
import { OutputData } from '@editorjs/editorjs'

const ReactEditorJS = createReactEditorJS()

interface Props {
  page: TEntityPageModel
  onChange?: (page: TEntityPageModel) => void
  onClose: () => void
}

const SetupPage: React.FC<Props> = ({
  page,
  onChange,
  onClose,
}): JSX.Element => {
  const editorCore = useRef(null)
  const [value, setValue] = useState<OutputData>({
    time: new Date().getTime(),
    blocks: page ? _.values(page) : [],
  })

  const handleChange = (): void => {
    onChange && onChange(_.keyBy(value.blocks, 'id'))
    onClose()
  }
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const handleReady = useCallback(() => {
    const editor = editorCore.current._editorJS
    new Undo({ editor })
    new DragDrop(editor)
  }, [])

  const handleSave = useCallback(async () => {
    const data = await editorCore.current.save()
    setValue(data)
  }, [])

  return (
    <Wrapper>
      <Row className="align-items-center justify-content-between">
        <Typography
          fontWeight={400}
          fontSize="24px"
          lineHeight="28px"
          letterSpacing="0.3px"
        >
          Page describing the Asset Class
        </Typography>

        <Box className="d-flex" style={{ gap: 20 }}>
          <Button variant="secondary" onClick={onClose}>
            Back
          </Button>
          <Button variant="primary" onClick={handleChange}>
            Continue
          </Button>
        </Box>
      </Row>

      <Row
        style={{ display: 'block', pointerEvents: onChange ? 'auto' : 'none' }}
      >
        <ReactEditorJS
          onInitialize={handleInitialize}
          onReady={handleReady}
          tools={EDITOR_JS_TOOLS}
          defaultValue={value}
          onChange={handleSave}
        />
      </Row>
    </Wrapper>
  )
}

export default SetupPage
