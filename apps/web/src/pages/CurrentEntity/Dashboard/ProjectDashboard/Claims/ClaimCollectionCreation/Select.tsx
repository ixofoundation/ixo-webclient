import { FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { useCurrentEntityClaims } from 'hooks/currentEntity'
import { Button, PropertyBox } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { ReactComponent as ClaimIcon } from 'assets/images/icon-claim.svg'

interface Props {
  hidden?: boolean
  onSubmit: (claimId: string) => void
  onCancel?: () => void
}
const ClaimCollectionCreationSelectStep: React.FC<Props> = ({ hidden, onSubmit, onCancel }) => {
  const { claims } = useCurrentEntityClaims()
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

        <FlexBox $gap={6} $alignItems='center'>
          {Object.values(claims).map((claim) => (
            <FlexBox key={claim.id} $direction='column' $alignItems='center' $gap={4}>
              <PropertyBox
                icon={<ClaimIcon />}
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
          Alternatively you can add a new linked Claim.
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
