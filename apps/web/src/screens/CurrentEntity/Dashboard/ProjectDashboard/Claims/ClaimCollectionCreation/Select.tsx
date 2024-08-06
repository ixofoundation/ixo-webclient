import Image from 'next/image'
import { Typography } from 'components/Typography'
import { deviceWidth } from 'constants/device'
import { Button, PropertyBox } from 'screens/CreateEntity/Components'
import React, { useState } from 'react'
import { TEntityClaimModel } from 'types/entities'
import { useParams, NavLink } from 'react-router-dom'
import { IconClaim } from 'components/IconPaths'
import { Flex, useMantineTheme } from '@mantine/core'

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
  const theme = useMantineTheme()

  if (hidden) {
    return null
  }

  return (
    <Flex direction='column'>
      <Flex direction='column' gap={9} w={deviceWidth.tablet + 'px'} mb={40}>
        <Typography variant='secondary' size='base'>
          Select the linked Claim for which you want to create a new Claim Collection.
        </Typography>

        <Flex gap={6} align='flex-start'>
          {Object.values(claims).map((claim) => (
            <Flex key={claim.id} direction='column' align='flex-start' gap={4}>
              <PropertyBox
                icon={<Image src={IconClaim} alt='Claim' width={5} height={5} color={theme.colors.blue[5]} />}
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
            </Flex>
          ))}
        </Flex>

        <Typography variant='secondary' size='base'>
          Alternatively you can add a{' '}
          <NavLink to={`/entity/${entityId}/dashboard/edit?addClaim=true`}>new linked Claim</NavLink>.
        </Typography>
      </Flex>

      <Flex gap={5}>
        <Button variant='secondary' onClick={onCancel}>
          Back
        </Button>
        <Button variant='primary' disabled={!selected} onClick={() => onSubmit(selected)}>
          Continue
        </Button>
      </Flex>
    </Flex>
  )
}

export default ClaimCollectionCreationSelectStep
