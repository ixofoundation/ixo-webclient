import { Button, Flex, Text } from '@mantine/core'
import { IconCircleDashed } from '@tabler/icons-react'
import { ActionCard } from 'components/ActionCard'
import { useCreateEntityWithCreateFlow } from 'hooks/entity/useCreateEntityWithCreateFlow'
import { Link } from 'react-router-dom'

export const CreateEntityCard = () => {
  const { signCreateEntityTransaction, isLoading, completedDid } = useCreateEntityWithCreateFlow()

  if (completedDid) {
    return (
      <ActionCard title='Entity Created' icon={<IconCircleDashed size={24} />}>
        <Flex direction='column'>
          <Text mt={5}>Your entity has been successfully created.</Text>
          <Button component={Link} to={`/entity/${completedDid}`} mt={15} radius={'md'}>
            View Entity
          </Button>
        </Flex>
      </ActionCard>
    )
  }

  return (
    <ActionCard title='Create Entity' icon={<IconCircleDashed size={24} />}>
      <Flex direction='column'>
        <Text mt={5}>Check if everything is filled out correctly. Creating an entity requires signing</Text>
        <Button loading={isLoading} mt={15} radius={'md'} onClick={signCreateEntityTransaction}>
          Sign to Create
        </Button>
      </Flex>
    </ActionCard>
  )
}
