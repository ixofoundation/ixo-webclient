import { Flex } from '@mantine/core'
import ActionCard from 'components/ActionCard/ActionCard'
import { DateRangeDisplay } from 'components/DateRangeDisplay'
import { LiaCalendar } from 'react-icons/lia'
import { TEntityModel } from 'types/entities'

type TimeSpanCardProps = {
  entity: TEntityModel
}

const TimeSpanCard = ({ entity }: TimeSpanCardProps) => {
  const startDate = new Date(entity?.startDate as unknown as string)
  const endDate = new Date(entity?.endDate as unknown as string)

  return (
    <ActionCard title='Period' icon={<LiaCalendar />}>
      <Flex w='100%' justify='center' gap='md'>
        <DateRangeDisplay startDate={startDate} endDate={endDate} />
      </Flex>
    </ActionCard>
  )
}

export default TimeSpanCard
