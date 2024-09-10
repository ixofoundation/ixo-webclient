import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import React, { useEffect, useState } from 'react'
import { Button, PropertyBox } from 'screens/CreateEntity/Components'
import { useNavigate, useParams } from 'react-router-dom'
import { Flex } from '@mantine/core'
import { useEntitiesQuery } from 'generated/graphql'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectAllDeedProtocolProposals } from 'redux/entities/entities.selectors'
import { getEntitiesFromGraphqlAction, updateEntityPropertyAction } from 'redux/entities/entities.actions'
import { useAccount } from 'hooks/account'
import { apiEntityToEntity } from 'utils/entities'
import { useCreateEntityState } from 'hooks/createEntity'

export interface TProposalTemplate {
  id: string
  label: string
  description: string
  icon: React.FC
}

const SetupProposalTemplate: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const [selectedTemplateEntityId, setselectedTemplateEntityId] = useState<string>('')
  const { cwClient } = useAccount()
  const { updateProposal } = useCreateEntityState()

  const deedProtocolProposals = useAppSelector(selectAllDeedProtocolProposals)
  useEntitiesQuery({
    skip: deedProtocolProposals.length > 0,
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        type: { equalTo: 'protocol/deed' },
      },
    },
    onCompleted: ({ entities }) => {
      const nodes = entities?.nodes ?? []
      if (nodes.length > 0) {
        dispatch(getEntitiesFromGraphqlAction(nodes as any[]))
        for (const entity of nodes) {
          apiEntityToEntity({ entity, cwClient }, (key, data, merge = false) => {
            dispatch(updateEntityPropertyAction(entity.id, key, data, merge))
          })
        }
      }
    },
  })

  const onBack = () => {
    navigate(`/entity/${entityId}/dashboard/governance?selectedGroup=${coreAddress}`)
  }
  const onContinue = () => {
    if (selectedTemplateEntityId === 'custom') {
      navigate(`/entity/${entityId}/dashboard/governance/${coreAddress}/info`)
    } else {
      const search = new URLSearchParams()
      search.append('selectedTemplateEntityId', selectedTemplateEntityId)
      navigate({
        pathname: `/entity/${entityId}/dashboard/governance/${coreAddress}/detail`,
        search: search.toString(),
      })
    }
  }

  useEffect(() => {
    updateProposal({
      name: '',
      description: '',
      actions: [],
    })
  }, [updateProposal])

  return (
    <Flex w={'100%'} justify='left'>
      <Flex direction='column' gap={60} w={deviceWidth.tablet}>
        <Flex direction={'column'} gap={36}>
          <Typography>Select one of the proposal templates, or create a custom proposal</Typography>

          <Flex gap={24} wrap={'wrap'}>
            {deedProtocolProposals
              .sort((a, b) => (a.profile?.name || '').localeCompare(b.profile?.name || ''))
              .map((entity) => {
                return (
                  <PropertyBox
                    key={entity.id}
                    // icon={Icon && <Icon />}
                    label={entity.profile?.name}
                    set={selectedTemplateEntityId === entity.id}
                    handleClick={() => setselectedTemplateEntityId(entity.id)}
                  />
                )
              })}
            <PropertyBox
              // icon={Icon && <Icon />}
              label={'Custom Proposal'}
              set={selectedTemplateEntityId === 'custom'}
              handleClick={() => setselectedTemplateEntityId('custom')}
            />
          </Flex>
        </Flex>

        <Flex w='100%' justify='flex-start' gap={16}>
          <Button variant='secondary' onClick={onBack}>
            Back
          </Button>
          <Button onClick={onContinue} disabled={!selectedTemplateEntityId}>
            Continue
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SetupProposalTemplate
