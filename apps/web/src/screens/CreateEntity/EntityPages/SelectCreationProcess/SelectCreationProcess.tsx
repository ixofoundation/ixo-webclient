import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import { PageWrapper, Selections, SearchIcon } from './SelectCreationProcess.styles'
import { CateSelector, ChainSelector, Input } from 'screens/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { apiEntityToEntity } from 'utils/entities'
import { Box, Button, useMantineTheme } from '@mantine/core'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { EntityLinkedResourceConfig } from 'constants/entity'
import { useGetEntityById } from 'graphql/entities'
import { useCreateEntityStepState } from 'hooks/createEntityStepState'
import { IconCreator } from 'components/IconPaths'
import { IconEntity } from 'components/IconPaths'
import { IconSearch } from 'components/IconPaths'

const SelectCreationProcess: React.FC = (): JSX.Element => {
  const theme = useMantineTheme()
  const SearchInputStyles = {
    fontFamily: theme.fontFamily,
    fontWeight: 500,
    fontSize: 20,
    lineHeight: 28,
  }
  const {
    entityType,
    updateProfile,
    updateCreator,
    updateAdministrator,
    updateDDOTags,
    updatePage,
    updateService,
    updateLinkedEntity,
    updateLinkedResource,
    updateStartEndDate,
    updateQuestionJSON,
    updateClaim,
  } = useCreateEntityState()
  const [isClone, setIsClone] = useState(false)
  const [existingDid, setExistingDid] = useState('')
  const [chainId, setChainId] = useState(undefined)
  const { data: selectedEntity } = useGetEntityById(existingDid)
  const { navigateToNextStep } = useCreateEntityStepState()

  const canClone = useMemo(() => chainId && selectedEntity?.type === entityType, [chainId, selectedEntity, entityType])

  const handleCreate = (): void => {
    navigateToNextStep()
  }

  const handleClone = (): void => {
    apiEntityToEntity({ entity: selectedEntity }, (key: string, value: any, merge) => {
      switch (key) {
        case 'profile':
          updateProfile(value)
          break
        case 'creator':
          updateCreator(value)
          break
        case 'administrator':
          updateAdministrator(value)
          break
        case 'page':
          updatePage(value)
          break
        case 'tags':
          updateDDOTags(value)
          break
        case 'service':
          updateService(value)
          break
        case 'linkedEntity':
          updateLinkedEntity(value)
          break
        case 'linkedResource':
          updateLinkedResource(
            value.filter((item: LinkedResource) => Object.keys(EntityLinkedResourceConfig).includes(item.type)),
          )
          break
        case 'surveyTemplate':
          updateQuestionJSON(value)
          break
        case 'claim':
          updateClaim(value)
          break
        default:
          break
      }
    })
    // additional
    updateStartEndDate({ startDate: selectedEntity.startDate, endDate: selectedEntity.endDate })
    navigateToNextStep()
  }

  return (
    <PageWrapper>
      <Selections>
        <CateSelector
          icon={<Image src={IconCreator} alt='Creator' width={5} height={5} color={theme.colors.blue[5]} />}
          label='Create a New Entity'
          onClick={handleCreate}
        />
        <CateSelector
          icon={<Image src={IconEntity} alt='Entity' width={5} height={5} color={theme.colors.blue[5]} />}
          label='Clone an Existing Entity'
          active={isClone}
          onClick={(): void => setIsClone((pre) => !pre)}
        />
      </Selections>

      {isClone && (
        <Box className='d-flex align-items-center' style={{ gap: 16 }}>
          <ChainSelector chainId={chainId!} onChange={setChainId as any} />
          <Input
            inputValue={existingDid}
            handleChange={setExistingDid}
            placeholder='Type to Search or enter a DID'
            preIcon={<Image src={IconSearch} alt='Search' width={5} height={5} color={theme.colors.blue[5]} />}
            width='400px'
            height='48px'
            style={SearchInputStyles}
          />
          <Button onClick={handleClone} disabled={!canClone}>
            Continue
          </Button>
        </Box>
      )}
    </PageWrapper>
  )
}

export default SelectCreationProcess
