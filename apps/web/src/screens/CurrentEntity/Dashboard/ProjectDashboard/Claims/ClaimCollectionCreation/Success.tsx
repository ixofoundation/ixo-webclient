import Image from 'next/image'
import { deviceWidth } from 'constants/device'
import { Button } from 'screens/CreateEntity/Components'
import React from 'react'
import { Flex, useMantineTheme } from '@mantine/core'
import { Typography } from 'components/Typography'
import { IconCheckCircle } from 'components/IconPaths'

interface Props {
  hidden?: boolean
  onSubmit: () => void
}

const ClaimCollectionCreationSuccessStep: React.FC<Props> = ({ hidden, onSubmit }) => {
  const theme = useMantineTheme()

  if (hidden) {
    return null
  }

  return (
    <Flex direction='column'>
      <Flex direction='column' gap={9} w={deviceWidth.tablet + 'px'} mb={40}>
        <Image src={IconCheckCircle} alt='CheckCircle' width={5} height={5} color={theme.colors.green[3]} />

        <Typography color='green'>Claim Collection successfully created!</Typography>

        <Flex w='100%' h='1px' bg={theme.colors.grey[3]} />
      </Flex>

      <Flex gap={5}>
        <Button variant='primary' size='flex' width={300} onClick={onSubmit}>
          Back to Dashboard
        </Button>
      </Flex>
    </Flex>
  )
}

export default ClaimCollectionCreationSuccessStep
