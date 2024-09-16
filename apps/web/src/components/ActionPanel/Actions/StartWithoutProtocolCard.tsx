import { Button, Flex, Text } from '@mantine/core'
import { IconCircleDashed } from '@tabler/icons-react'
import { ActionCard } from 'components/ActionCard'
import { Link } from 'react-router-dom'

export const StartWithoutProtocolCard = () => {
  return (
    <ActionCard title='Create entity' icon={<IconCircleDashed size={24} />}>
      <Flex direction='column'>
        <Text mt={5}>If you want to create an entity without a template protocol, start here</Text>
        <Button component={Link} to='/entity/create-new' mt={15} radius={'md'}>
          Start without Protocol
        </Button>
      </Flex>
    </ActionCard>
  )
}
