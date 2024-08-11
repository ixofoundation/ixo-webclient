import { Flex } from '@mantine/core'
import { DatePicker, DatesRangeValue } from '@mantine/dates'
import ActionCard from 'components/ActionCard/ActionCard'
import { DateRangeDisplay } from 'components/DateRangeDisplay'
import { useMemo } from 'react'
import { LiaCalendar } from 'react-icons/lia'
import { useParams } from 'react-router-dom'
import { getEntityById } from 'redux/entities/entities.selectors'
import { useAppSelector } from 'redux/hooks'

const TimeSpanCard = () => {
  const { entityId = '' } = useParams()
  const entity = useAppSelector(getEntityById(entityId))

  const startDate = new Date(entity?.startDate as unknown as string)
  const endDate = new Date(entity?.endDate as unknown as string)

  const dates = useMemo(() => {
    return [new Date(startDate) ?? null, new Date(endDate) ?? null] as DatesRangeValue
  }, [startDate, endDate])

  return (
    <ActionCard title='Period' icon={<LiaCalendar />} editable={false}>
      <Flex w='100%' justify='center' gap='md'>
        <Flex justify='center' w='100%'>
          <DatePicker type='range' value={dates} />
        </Flex>
      </Flex>
    </ActionCard>
  )
}

export default TimeSpanCard
