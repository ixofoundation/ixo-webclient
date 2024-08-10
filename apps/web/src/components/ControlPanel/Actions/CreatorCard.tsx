import { Flex, Avatar, Box, Text } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { LiaPlusCircleSolid } from 'react-icons/lia'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'
import { TEntityModel } from 'types/entities'
import { DateFormat, formatDate } from 'utils/date'

const CreatorCard = () => {
  const { entityId = '' } = useParams()
  const entity = useAppSelector(getEntityById(entityId))

  const date = formatDate({
    dateString: new Date(entity?.startDate as unknown as string).toString(),
    format: DateFormat.DD_MM_YYYY,
  })
  return (
    <ActionCard title='Requester' icon={<LiaPlusCircleSolid />}>
      <Flex w='100%' align='center' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }}>
        <Avatar src={entity?.creator?.logo} alt='Avatar' />
        <Box w='100%' px='md'>
          <Flex justify={'flex-start'}>
            <Text>{entity?.creator?.displayName}</Text>
          </Flex>
          <Flex justify={'flex-start'}>
            <Text c='dimmed' size='sm'>
              {date}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </ActionCard>
  )
}

export default CreatorCard
