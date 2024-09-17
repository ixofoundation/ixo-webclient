import { Button, Flex, Text } from '@mantine/core'
import { IconCircleDashed } from '@tabler/icons-react'
import { ActionCard } from 'components/ActionCard'
import { friendlyEntityTypes } from 'components/KeyValueTable'
import { Link, useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'

export const UseProtocolCard = () => {
  const { entityId = '' } = useParams()
  const { type } = useAppSelector(getEntityById(entityId))

  if (!type.includes('protocol')) return null

  return (
    <ActionCard title='Protocol' icon={<IconCircleDashed size={24} />} editable={false}>
      <Flex direction='column'>
        <Text mt={5}>Do you want to create a {friendlyEntityTypes(type)} using this Project Protocol?</Text>
        <Button component={Link} to={`/entity/create-new/${entityId}/overview`} mt={15} radius={'md'}>
          Use this {friendlyEntityTypes(type)} Protocol
        </Button>
      </Flex>
    </ActionCard>
  )
}
