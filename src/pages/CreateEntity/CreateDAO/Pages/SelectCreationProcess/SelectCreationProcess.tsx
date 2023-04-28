import { Box } from 'components/App/App.styles'
import React, { useEffect, useMemo, useState } from 'react'
import { ReactComponent as EntityIcon } from 'assets/images/icon-entity.svg'
import { ReactComponent as CreatorIcon } from 'assets/images/icon-creator.svg'
import { PageWrapper, Selections, SearchIcon, SearchInputStyles } from './SelectCreationProcess.styles'
import { Button, CateSelector, ChainSelector, Input } from 'pages/CreateEntity/Components'
import { useCreateEntityState } from 'hooks/createEntity'
import { validateEntityDid } from 'utils/validation'
import { BlockSyncService } from 'services/blocksync'
import { apiEntityToEntity } from 'utils/entities'
import { useAccount } from 'hooks/account'
import { useWalletManager } from '@gssuper/cosmodal'

const bsService = new BlockSyncService()

const SelectCreationProcess: React.FC = (): JSX.Element => {
  const {
    gotoStep,
    updateMetadata,
    updateCreator,
    updateAdministrator,
    updateDDOTags,
    updatePage,
    updateService,
    // updateLinkedResource,
    // updateAccordedRight,
    updateLinkedEntity,
    updateDAOGroups,
  } = useCreateEntityState()
  const { connect } = useWalletManager()
  const { cosmWasmClient, address } = useAccount()
  const [isClone, setIsClone] = useState(false)
  const [existingDid, setExistingDid] = useState('')
  const [chainId, setChainId] = useState(undefined)
  const [cloningEntityType, setCloningEntityType] = useState('')

  const canClone = useMemo(() => chainId && cloningEntityType === 'dao', [chainId, cloningEntityType])

  const handleCreate = (): void => {
    gotoStep(1)
  }

  const handleClone = (): void => {
    if (!address) {
      connect()
    } else {
      apiEntityToEntity({ entityId: existingDid, cosmWasmClient, address }, (key: string, value: any, merge) => {
        console.log('apiEntityToEntity', { key, value, merge })
        switch (key) {
          case 'metadata':
            updateMetadata(value)
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
          case 'ddoTags':
            updateDDOTags(value)
            break
          case 'service':
            updateService(value)
            break
          case 'linkedEntity':
            updateLinkedEntity(value)
            break
          case 'daoGroups':
            updateDAOGroups(value)
            break
          case 'linkedResource':
            break
          default:
            break
        }
      })
    }
    gotoStep(1)
  }

  useEffect(() => {
    if (validateEntityDid(existingDid)) {
      bsService.entity
        .getEntityById(existingDid)
        .then((response: any) => {
          setCloningEntityType(response.type)
        })
        .catch(() => setCloningEntityType(''))
    } else {
      setCloningEntityType('')
    }
  }, [existingDid])

  return (
    <PageWrapper>
      <Selections>
        <CateSelector icon={<CreatorIcon />} label='Create a New Entity' onClick={handleCreate} />
        <CateSelector
          icon={<EntityIcon />}
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
            preIcon={<SearchIcon />}
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
