import { Button, Flex, Text } from '@mantine/core'
import { IconCircleDashed } from '@tabler/icons-react'
import { ActionCard } from 'components/ActionCard'
import { useCreateEntityWithCreateFlow } from 'hooks/entity/useCreateEntityWithCreateFlow'

export const CreateEntityCard = () => {
  const { signCreateEntityTransaction } = useCreateEntityWithCreateFlow()

  return (
    <ActionCard title='Create Entity' icon={<IconCircleDashed size={24} />}>
      <Flex direction='column'>
        <Text mt={5}>Check if everything is filled out correctly. Creating an entity requires signing</Text>
        <Button mt={15} radius={'md'} onClick={signCreateEntityTransaction}>
          Sign to Create
        </Button>
      </Flex>
    </ActionCard>
  )
}
