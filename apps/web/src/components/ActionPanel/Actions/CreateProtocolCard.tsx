import { Button, Flex, Text } from '@mantine/core'
import { IconCircleDashed } from '@tabler/icons-react'
import { ActionCard } from 'components/ActionCard'
import { Link } from 'react-router-dom'

export const CreateProtocolCard = () => {
  return (
    <ActionCard title='Protocol' icon={<IconCircleDashed size={24} />}>
      <Flex direction='column'>
        <Text mt={5}>Can't find a suitable Protocol?</Text>
        <Button component={Link} to='create-new' mt={15} radius={'md'}>
          Create Protocol
        </Button>
      </Flex>
    </ActionCard>
  )
}
