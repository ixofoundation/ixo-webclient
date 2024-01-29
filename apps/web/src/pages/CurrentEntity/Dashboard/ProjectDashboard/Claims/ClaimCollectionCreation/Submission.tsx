import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { Button, PropertyBox } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { selectAllDeedProtocols } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { TEntityModel } from 'types/entities'

interface Props {
  hidden?: boolean
  onSubmit: (protocolDeedId: string) => void
  onCancel?: () => void
}
const ClaimCollectionCreationSubmissionStep: React.FC<Props> = ({ hidden, onSubmit, onCancel }) => {
  const theme: any = useTheme()
  const deedProtocols = useAppSelector(selectAllDeedProtocols)

  const [protocolDeedId, setProtocolDeedId] = useState('')

  if (hidden) {
    return null
  }

  return (
    <FlexBox direction='column'>
      <FlexBox direction='column' gap={9} width={deviceWidth.tablet + 'px'} mb={40}>
        <Typography variant='secondary' size='base'>
          Set up the claim submission process
        </Typography>

        <FlexBox direction='column' gap={6}>
          <Typography>Offer application form</Typography>
          <FlexBox gap={6}>
            {deedProtocols.map((entity: TEntityModel) => (
              <FlexBox key={entity.id} direction='column' alignItems='center' gap={4}>
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
                  overflowLines={2}
                  style={{ width: 100, textAlign: 'center' }}
                >
                  {entity.profile?.name || entity.id}
                </Typography>
              </FlexBox>
            ))}

            <NavLink to={`/create/entity/protocol/deed/profile?type=offer`}>
              <FlexBox direction='column' alignItems='center' gap={4}>
                <PropertyBox icon={<PlusIcon />} noData />
                <Typography
                  variant='primary'
                  size='md'
                  color={'black'}
                  overflowLines={2}
                  style={{ width: 100, textAlign: 'center' }}
                >
                  Create Custom
                </Typography>
              </FlexBox>
            </NavLink>
          </FlexBox>
        </FlexBox>

        <FlexBox width='100%' height='1px' background={theme.ixoGrey300} />
      </FlexBox>

      <FlexBox gap={5}>
        <Button variant='secondary' onClick={onCancel}>
          Back
        </Button>
        <Button variant='primary' onClick={() => onSubmit(protocolDeedId)}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default ClaimCollectionCreationSubmissionStep
