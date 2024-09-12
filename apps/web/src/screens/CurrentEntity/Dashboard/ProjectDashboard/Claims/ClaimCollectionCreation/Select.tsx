import { FlexBox } from 'components/CoreEntry/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { Button, PropertyBox } from 'screens/CreateEntity/Components'
import React, { useState } from 'react'

import { TEntityClaimModel } from 'types/entities'
import { useParams, NavLink } from 'react-router-dom'

interface Props {
  hidden?: boolean
  onSubmit: (claimId: string) => void
  onCancel?: () => void
  claims: {
    [id: string]: TEntityClaimModel
  }
}
const ClaimCollectionCreationSelectStep: React.FC<Props> = ({ hidden, onSubmit, onCancel, claims }) => {
  const { entityId } = useParams<{ entityId: string }>()
  const [selected, setSelected] = useState('')

  if (hidden) {
    return null
  }

  return (
    <FlexBox $direction='column'>
      <FlexBox $direction='column' $gap={9} width={deviceWidth.tablet + 'px'} mb={40}>
        <Typography variant='secondary' size='base'>
          Select the linked Claim for which you want to create a new Claim Collection.
        </Typography>

        <FlexBox $gap={6} $alignItems='flex-start'>
          {Object.values(claims).map((claim) => (
            <FlexBox key={claim.id} $direction='column' $alignItems='flex-start' $gap={4}>
              <PropertyBox
                icon={<img src='/assets/images/icon-claim.svg' />}
                required={true}
                set={true}
                hovered={selected === claim.id}
                handleClick={(): void => setSelected(claim.id)}
              />
              <Typography
                variant='primary'
                size='md'
                color={selected === claim.id ? 'blue' : 'black'}
                $overflowLines={2}
                style={{ width: 100, textAlign: 'center' }}
              >
                {claim.template?.title ?? ''}
              </Typography>
            </FlexBox>
          ))}
        </FlexBox>

        <Typography variant='secondary' size='base'>
          Alternatively you can add a{' '}
          <NavLink to={`/entity/${entityId}/dashboard/edit?addClaim=true`}>new linked Claim</NavLink>.
        </Typography>
      </FlexBox>

      <FlexBox $gap={5}>
        <Button variant='secondary' onClick={onCancel}>
          Back
        </Button>
        <Button variant='primary' disabled={!selected} onClick={() => onSubmit(selected)}>
          Continue
        </Button>
      </FlexBox>
    </FlexBox>
  )
}

export default ClaimCollectionCreationSelectStep
