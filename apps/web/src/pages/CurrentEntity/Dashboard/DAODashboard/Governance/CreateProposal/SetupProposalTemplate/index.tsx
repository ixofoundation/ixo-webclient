import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import React, { useEffect, useState } from 'react'
import { Button, PropertyBox } from 'pages/CreateEntity/Components'
import { useNavigate, useParams } from 'react-router-dom'
import { Flex } from '@mantine/core'
import { useEntitiesQuery } from 'generated/graphql'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectAllDeedProtocolProposals } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import {
  getEntitiesFromGraphqlAction,
  updateEntityPropertyAction,
} from 'redux/entitiesExplorer/entitiesExplorer.actions'
import { useAccount } from 'hooks/account'
import { apiEntityToEntity } from 'utils/entities'
import { TEntityModel } from 'types/entities'

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
  const [selectedProposalTemplate, setSelectedProposalTemplate] = useState<TEntityModel | undefined>()
  const { cwClient } = useAccount()

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
    navigate(
      `/entity/${entityId}/dashboard/governance/${coreAddress}/detail?selectedTemplateEntityId=${selectedProposalTemplate?.id}`,
    )
  }

  useEffect(() => {
    if (!entityId) {
      navigate(`/explore`)
    }
  }, [entityId, navigate])

  return (
    <Flex w={'100%'} justify='left'>
      <Flex direction='column' gap={60} w={deviceWidth.tablet}>
        <Flex direction={'column'} gap={36}>
          <Typography>Select one of the proposal templates, or create a custom proposal</Typography>

          <Flex gap={24}>
            {deedProtocolProposals.map((entity) => {
              return (
                <PropertyBox
                  key={entity.id}
                  // icon={Icon && <Icon />}
                  label={entity.profile?.name}
                  set={selectedProposalTemplate?.id === entity.id}
                  handleClick={() => setSelectedProposalTemplate(entity)}
                />
              )
            })}
          </Flex>
        </Flex>

        <Flex w='100%' justify='flex-start' gap={16}>
          <Button variant='secondary' onClick={onBack}>
            Back
          </Button>
          <Button onClick={onContinue}>Continue</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SetupProposalTemplate
