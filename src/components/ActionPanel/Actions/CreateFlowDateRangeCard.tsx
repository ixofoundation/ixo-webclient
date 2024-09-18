import { Flex } from '@mantine/core'
import { DatePicker, DatesRangeValue } from '@mantine/dates'
import { ActionCard } from 'components/ActionCard'
import { useMemo } from 'react'
import { LiaTagSolid } from 'react-icons/lia'
import { useDispatch } from 'react-redux'
import { setEndDate, setStartDate } from 'redux/createFlow/slice'
import { useAppSelector } from 'redux/hooks'

export const CreateFlowDateRangeCard = () => {
  const { startDate, endDate } = useAppSelector((state) => state.createFlow)
  const dispatch = useDispatch()

  const handleDateChange = (dates: DatesRangeValue) => {
    dates[0] && dispatch(setStartDate(dates[0].toISOString()))
    dates[1] && dispatch(setEndDate(dates[1].toISOString()))
  }

  const dates = useMemo(() => {
    return [startDate ? new Date(startDate) : new Date(), endDate ? new Date(endDate) : null] as DatesRangeValue
  }, [startDate, endDate])

  return (
    <ActionCard title={'Period'} icon={<LiaTagSolid />}>
      <Flex justify='center' w='100%'>
        <DatePicker type='range' value={dates} onChange={handleDateChange} />
      </Flex>
    </ActionCard>
  )
}
