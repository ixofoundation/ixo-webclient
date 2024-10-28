import { Box } from 'components/CoreEntry/App.styles'
import React, { useMemo, useState } from 'react'

import { PageWrapper, Selections, SearchIcon } from './SelectCreationProcess.styles'
import { Button, CateSelector, ChainSelector, Input } from 'screens/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { apiEntityToEntity } from 'utils/entities'
import { useTheme } from 'styled-components'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { EntityLinkedResourceConfig } from 'constants/entity'
import { useGetEntityById } from 'graphql/entities'
import { useCreateEntityStepState } from 'hooks/createEntityStepState'
import { getEntity } from 'services/entities/getGQLEntity'
import { gqlClientByChain } from 'services/gql/clients'
import { currentChainId } from 'constants/common'

const SelectCreationProcess: React.FC = (): JSX.Element => {
  const theme: any = useTheme()
  const SearchInputStyles = {
    fontFamily: theme.secondaryFontFamily,
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
  const [chainId, setChainId] = useState<string | undefined>(currentChainId)
  const { data: selectedEntity } = useGetEntityById(existingDid)
  const { navigateToNextStep } = useCreateEntityStepState()

  const canClone = useMemo(() => chainId && existingDid, [chainId, existingDid])

  const handleCreate = (): void => {
    navigateToNextStep()
  }

  const handleClone = async () => {
    if (!chainId) return null
    const entity = await getEntity({
      id: existingDid,
      gqlClient: gqlClientByChain[chainId as keyof typeof gqlClientByChain],
    })
    apiEntityToEntity({ entity: entity }, (key: string, value: any, merge) => {
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
          icon={<img src='/assets/images/icon-creator.svg' />}
          label='Create a New Entity'
          onClick={handleCreate}
        />
        <CateSelector
          icon={<img src='/assets/images/icon-entity.svg' />}
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
