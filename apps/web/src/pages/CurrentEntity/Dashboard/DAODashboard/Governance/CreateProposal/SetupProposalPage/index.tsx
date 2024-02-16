import React, { useState, useCallback, useRef } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import _ from 'lodash'
// @ts-ignore
import DragDrop from 'editorjs-drag-drop'
// @ts-ignore
import Undo from 'editorjs-undo'
import { OutputBlockData, OutputData } from '@editorjs/editorjs'
import { Flex } from '@mantine/core'
import styled, { useTheme } from 'styled-components'
import { ReactComponent as PlusCircleIcon } from 'assets/images/icon-plus-circle-solid.svg'
import { SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { PropertiesForm } from 'pages/CreateEntity/Forms'
import { useCreateEntityState } from 'hooks/createEntity'
import { EDITOR_JS_TOOLS } from 'pages/CreateEntity/Forms/PropertiesForm/SetupPageContent/SetupPageContent.constants'
import { Button } from 'pages/CreateEntity/Components'
import { useNavigate, useParams } from 'react-router-dom'

export const Wrapper = styled(Flex)`
  font-family: ${(props): string => props.theme.secondaryFontFamily};

  .ce-block,
  .ce-toolbar {
    &__content {
      max-width: 100%;
      margin: 0;
    }
  }

  .cdx-button,
  .ce-header[contentEditable='true'][data-placeholder]::before {
    color: ${(props) => props.theme.ixoGrey700};
  }

  .cdx-button {
    border: none;
    box-shadow: none;
    padding: 0;
  }
`

const ReactEditorJS = createReactEditorJS()

const SetupProposalPage: React.FC = (): JSX.Element => {
  const theme: any = useTheme()
  const navigate = useNavigate()
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const editorCore = useRef(null)

  const {
    entityType,
    creator,
    administrator,
    page = {},
    service,
    linkedResource,
    claim,
    accordedRight,
    linkedEntity,
    daoGroups,
    updateCreator,
    updateAdministrator,
    updatePage,
    updateService,
    updateLinkedResource,
    updateClaim,
    updateAccordedRight,
    updateLinkedEntity,
  } = useCreateEntityState()

  const handleBack = (): void => {
    navigate(`/entity/${entityId}/dashboard/governance/${coreAddress}/info`)
  }
  const handleNext = (): void => {
    updatePage(_.keyBy(value.blocks, 'id'))
    navigate(`/entity/${entityId}/dashboard/governance/${coreAddress}/action`)
  }

  const DefHeroImageData: OutputBlockData = {
    id: 'page-hero-image',
    type: 'heroImage',
    data: undefined,
  }

  const DefPageTitleData: OutputBlockData = {
    id: 'page-title',
    type: 'pageTitle',
    data: undefined,
  }

  const DefPageContentData: OutputBlockData = {
    id: 'page-content',
    type: 'pageContent',
    data: undefined,
  }

  const [value, setValue] = useState<OutputData>({
    time: new Date().getTime(),
    blocks: [
      ...(Object.keys(page).length > 0 ? _.values(page) : [DefHeroImageData, DefPageTitleData, DefPageContentData]),
    ],
  })
  const [addLinked, setAddLinked] = useState(false)

  const handleInitialize = useCallback((instance: any) => {
    editorCore.current = instance
  }, [])

  const handleReady = useCallback(() => {
    const editor = (editorCore.current as any)._editorJS
    new Undo({ editor })
    new DragDrop(editor)
  }, [])

  const handleSave = useCallback(async () => {
    const data = await (editorCore.current as any).save()
    setValue(data)
  }, [])

  const PropertiesFormProps = {
    entityType,
    creator,
    administrator,
    page,
    service,
    linkedResource,
    claim,
    accordedRight,
    linkedEntity,
    daoGroups,
    updateCreator,
    updateAdministrator,
    updatePage,
    updateService,
    updateLinkedResource,
    updateClaim,
    updateAccordedRight,
    updateLinkedEntity,
  }

  return (
    <Wrapper direction={'column'} gap={50} w='100%'>
      <Flex direction={'column'} gap={24}>
        <Flex maw={720} py={30} px={60} style={{ border: `1px solid ${theme.ixoGrey300}` }}>
          <ReactEditorJS
            onInitialize={handleInitialize}
            onReady={handleReady}
            tools={EDITOR_JS_TOOLS}
            defaultValue={value}
            onChange={handleSave}
          />
        </Flex>

        {!addLinked ? (
          <Flex
            align={'center'}
            gap={4}
            style={{ color: theme.ixoNewBlue, cursor: 'pointer' }}
            onClick={() => setAddLinked(true)}
          >
            <SvgBox $svgWidth={6} $svgHeight={6}>
              <PlusCircleIcon />
            </SvgBox>
            <Typography>Add File</Typography>
          </Flex>
        ) : (
          <PropertiesForm {...PropertiesFormProps} />
        )}
      </Flex>
      <Flex align={'center'}>
        <Flex gap={20}>
          <Button variant='secondary' onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleNext}>Continue</Button>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default SetupProposalPage
