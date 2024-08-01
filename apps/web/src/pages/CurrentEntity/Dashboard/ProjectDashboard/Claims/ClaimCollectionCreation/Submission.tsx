import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { Button, PropertyBox } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import ClaimIcon from 'assets/images/icon-claim.svg'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectAllDeedProtocols } from 'redux/entities/entities.selectors'
import { TEntityModel } from 'types/entities'
import { useAccount } from 'hooks/account'
import { useEntitiesQuery } from 'generated/graphql'
import {
  getEntitiesFromGraphqlAction,
  updateEntityPropertyAction,
} from 'redux/entities/entities.actions'
import { apiEntityToEntity } from 'utils/entities'

interface Props {
  hidden?: boolean
  onSubmit: (protocolDeedId: string) => void
  onCancel?: () => void
}
const ClaimCollectionCreationSubmissionStep: React.FC<Props> = ({ hidden, onSubmit, onCancel }) => {
  const theme: any = useTheme()
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
    <FlexBox $direction='column'>
      <FlexBox $direction='column' $gap={9} width={deviceWidth.tablet + 'px'} mb={40}>
        <Typography variant='secondary' size='base'>
          Set up the claim submission process
        </Typography>

        <FlexBox $direction='column' $gap={6}>
          <Typography>Offer application form</Typography>
          <FlexBox $gap={6}>
            {deedProtocols.map((entity: TEntityModel) => (
              <FlexBox key={entity.id} $direction='column' $alignItems='center' $gap={4}>
                <PropertyBox
                  icon={<ClaimIcon />}
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
              </FlexBox>
            ))}
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background={theme.ixoGrey300} />
      </FlexBox>

      <FlexBox $gap={5}>
        <Button variant='secondary' onClick={onCancel}>
          Back
        </Button>
        <Button variant='primary' disabled={!protocolDeedId} onClick={() => onSubmit(protocolDeedId)}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default ClaimCollectionCreationSubmissionStep
