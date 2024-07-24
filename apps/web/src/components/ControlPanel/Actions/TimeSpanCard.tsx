import { Flex, Box, Text } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { LiaCalendar } from 'react-icons/lia'
import { TEntityModel } from 'types/entities'
import { DateFormat, formatDate } from 'utils/date'

type TimeSpanCardProps = {
  entity: TEntityModel
}

 const TimeCard = ({ title, date }: { title: string, date: string }) => {
  return (
    <Box w='100%' px='md' bg='#F9F9F9' p='sm' style={{ borderRadius: '10px' }}>
      <Flex justify={'center'} align={'center'} direction={'column'}>
        <Text c='dimmed'>{title}</Text>
        <Text>{date}</Text>
      </Flex>
    </Box>
  )
}

const TimeSpanCard = ({ entity }: TimeSpanCardProps) => {
  const startDate = formatDate({
    dateString: new Date(entity?.startDate as unknown as string).toString(),
    format: DateFormat.DD_MM_YYYY,
  })
  const endDate = formatDate({
    dateString: new Date(entity?.endDate as unknown as string).toString(),
    format: DateFormat.DD_MM_YYYY,
  })
  return (
    <ActionCard title='Timespan' icon={<LiaCalendar />}>
      <Flex w='100%' align='center' gap='md'>
        <TimeCard title='start' date={startDate} />
        <TimeCard title='end' date={endDate} />
      </Flex>
    </ActionCard>
  )
}

export default TimeSpanCard
