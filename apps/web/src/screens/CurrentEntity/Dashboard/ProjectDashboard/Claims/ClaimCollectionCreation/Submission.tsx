import Image from 'next/image'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { Button, PropertyBox } from 'screens/CreateEntity/Components'
import React, { useState } from 'react'
import { Flex, useMantineTheme } from '@mantine/core'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectAllDeedProtocols } from 'redux/entities/entities.selectors'
import { TEntityModel } from 'types/entities'
import { useAccount } from 'hooks/account'
import { useEntitiesQuery } from 'generated/graphql'
import { getEntitiesFromGraphqlAction, updateEntityPropertyAction } from 'redux/entities/entities.actions'
import { apiEntityToEntity } from 'utils/entities'
import { IconClaim } from 'components/IconPaths'

interface Props {
  hidden?: boolean
  onSubmit: (protocolDeedId: string) => void
  onCancel?: () => void
}
const ClaimCollectionCreationSubmissionStep: React.FC<Props> = ({ hidden, onSubmit, onCancel }) => {
  const theme = useMantineTheme()
  const dispatch = useAppDispatch()
  const { cwClient } = useAccount()

  const deedProtocols = useAppSelector(selectAllDeedProtocols)
  useEntitiesQuery({
    skip: deedProtocols.length > 0,
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        type: { equalTo: 'protocol/deed' },
        entityVerified: { equalTo: true },
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

  const [protocolDeedId, setProtocolDeedId] = useState('')

  if (hidden) {
    return null
  }

  return (
    <Flex direction='column'>
      <Flex direction='column' gap={9} w={deviceWidth.tablet + 'px'} mb={40}>
        <Typography variant='secondary' size='base'>
          Set up the claim submission process
        </Typography>

        <Flex direction='column' gap={6}>
          <Typography>Offer application form</Typography>
          <Flex gap={6}>
            {deedProtocols.map((entity: TEntityModel) => (
              <Flex key={entity.id} direction='column' align='center' gap={4}>
                <PropertyBox
                  icon={<Image src={IconClaim} alt='Claim' width={5} height={5} color={theme.colors.blue[5]} />}
                  required={true}
                  set={true}
                  hovered={protocolDeedId === entity.id}
                  handleClick={(): void => setProtocolDeedId(entity.id)}
                />
                <Typography
                  variant='primary'
                  size='md'
                  color={protocolDeedId === entity.id ? 'blue' : 'black'}
                  $overflowLines={2}
                  style={{ width: 100, textAlign: 'center' }}
                >
                  {entity.profile?.name || entity.id}
                </Typography>
              </Flex>
            ))}
          </Flex>
        </Flex>

        <Flex w='100%' h='1px' bg={theme.colors.grey[300]} />
      </Flex>

      <Flex gap={5}>
        <Button variant='secondary' onClick={onCancel}>
          Back
        </Button>
        <Button variant='primary' disabled={!protocolDeedId} onClick={() => onSubmit(protocolDeedId)}>
          Continue
        </Button>
      </Flex>
    </Flex>
  )
}

export default ClaimCollectionCreationSubmissionStep
