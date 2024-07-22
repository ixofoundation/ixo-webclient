import React, { useState, useCallback } from 'react'

import { Flex } from '@mantine/core'
import styled, { useTheme } from 'styled-components'
import { ReactComponent as PlusCircleIcon } from 'assets/images/icon-plus-circle-solid.svg'
import { SvgBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { PropertiesForm } from 'pages/CreateEntity/Forms'
import { useCreateEntityState } from 'hooks/createEntity'
import { Button } from 'pages/CreateEntity/Components'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'hooks/window'
import { TEntityPageModel } from 'types/entities'
import Editor from 'components/Editor/Editor'

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

const SetupProposalPage: React.FC = (): JSX.Element => {
  const theme: any = useTheme()
  const navigate = useNavigate()
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const { getQuery } = useQuery()
  const selectedTemplateEntityId = getQuery('selectedTemplateEntityId')

  const {
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
  } = useCreateEntityState()

  const [value, setValue] = useState<TEntityPageModel>({
    pageTitle: "",
    featuredImage: "",
    content: undefined
  })

  const handleBack = (): void => {
    const search = new URLSearchParams()
    if (selectedTemplateEntityId) {
      search.append('selectedTemplateEntityId', selectedTemplateEntityId)
      navigate({
        pathname: `/entity/${entityId}/dashboard/governance/${coreAddress}/detail`,
        search: search.toString(),
      })
    } else {
      navigate(`/entity/${entityId}/dashboard/governance/${coreAddress}/action`)
    }
  }
  const handleNext = (): void => {
    updatePage(value)

    const search = new URLSearchParams()
    if (selectedTemplateEntityId) {
      search.append('selectedTemplateEntityId', selectedTemplateEntityId)
    }
    navigate({
      pathname: `/entity/${entityId}/dashboard/governance/${coreAddress}/review`,
      search: search.toString(),
    })
  }


  const [addLinked, setAddLinked] = useState(false)

  const handleSave = useCallback((page: TEntityPageModel) => {
    setValue(page)
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
      <Flex direction={'column'} gap={24} w='100%'>
        <Flex w='100%' direction={'column'} py={30} px={60} style={{ border: `1px solid ${theme.ixoGrey300}` }}>
        <Editor editable={true} onChange={handleSave} initialPage={value}/>
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
