import Image from 'next/image'
import React, { useState, useCallback } from 'react'
import { Flex, Box, Button, useMantineTheme } from '@mantine/core'
import { Typography } from 'components/Typography'
import { PropertiesForm } from 'screens/CreateEntity/Forms'
import { useCreateEntityState } from 'hooks/createEntity'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'hooks/window'
import { TEntityPageModel } from 'types/entities'
import Editor from 'components/Editor/Editor'
import { IconPlusCircleSolid } from 'components/IconPaths'
import { createStyles } from '@mantine/emotion'

const useStyles = createStyles((theme) => ({
  wrapper: {
    fontFamily: theme.fontFamily,

    '& .ce-block, & .ce-toolbar': {
      '&__content': {
        maxWidth: '100%',
        margin: 0,
      },
    },

    '& .cdx-button, & .ce-header[contentEditable="true"][data-placeholder]::before': {
      color: theme.colors.gray[7],
    },

    '& .cdx-button': {
      border: 'none',
      boxShadow: 'none',
      padding: 0,
    },
  },
  editorWrapper: {
    border: `1px solid ${theme.colors.gray[3]}`,
  },
  addFileButton: {
    color: theme.colors.blue[5],
    cursor: 'pointer',
  },
}))

const SetupProposalPage: React.FC = (): JSX.Element => {
  const { classes } = useStyles()
  const theme = useMantineTheme()
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
    pageTitle: '',
    featuredImage: '',
    content: undefined,
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
    <Flex direction='column' gap={50} w='100%' className={classes.wrapper}>
      <Flex direction='column' gap={24} w='100%'>
        <Box className={classes.editorWrapper} py={30} px={60}>
          <Editor editable={true} onChange={handleSave} initialPage={value} />
        </Box>

        {!addLinked ? (
          <Flex align='center' gap={4} className={classes.addFileButton} onClick={() => setAddLinked(true)}>
            <Box w={6} h={6}>
              <Image src={IconPlusCircleSolid} alt='PlusCircle' width={5} height={5} />
            </Box>
            <Typography>Add File</Typography>
          </Flex>
        ) : (
          <PropertiesForm {...PropertiesFormProps} />
        )}
      </Flex>
      <Flex align='center'>
        <Flex gap={20}>
          <Button variant='outline' onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleNext}>Continue</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SetupProposalPage
