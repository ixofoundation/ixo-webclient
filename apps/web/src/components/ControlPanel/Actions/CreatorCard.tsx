import { Flex, Avatar, Box, Text } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { LiaPlusCircleSolid } from 'react-icons/lia'
import { NavLink } from 'react-router-dom'
import { TEntityModel } from 'types/entities'
import { DateFormat, formatDate } from 'utils/date'

type CreatorCardProps = {
  entity: TEntityModel
}

const CreatorCard = ({ entity }: CreatorCardProps) => {
  const date = formatDate({
    dateString: new Date(entity?.startDate as unknown as string).toString(),
    format: DateFormat.DD_MM_YYYY,
  })
  return (
    <ActionCard title='Creator' icon={<LiaPlusCircleSolid />}>
      <Flex w='100%' align='center' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }}>
        <Avatar src={entity?.creator?.logo} alt='Avatar' />
        <Box w='100%' px='md'>
          <Flex justify={'center'}>
            <Text mx='auto'>{entity?.creator?.displayName}</Text>
          </Flex>
          <Flex justify={'space-between'}>
            <Text c="dimmed" size="sm">{date}</Text>
            <NavLink to={''}><Text size="sm">See Profile</Text></NavLink>
          </Flex>
        </Box>
      </Flex>
    </ActionCard>
  )
}

export default CreatorCard
