import React from 'react'
import { TClaimQuestionControlProps } from './types'
import { DateRangePicker } from 'pages/CreateEntity/Components'

const DateRangeSelector: React.FC<TClaimQuestionControlProps> = ({ id, value, onChange, ...rest }) => {
  const [startDate, endDate] = ((value as string) || '+').split('+')
  return (
    <DateRangePicker
      id={id}
      startDate={startDate || ''}
      endDate={endDate || ''}
      openDirection='up'
      onChange={(startDate, endDate) => {
        onChange(`${startDate}+${endDate}`)
      }}
    />
  )
}

export default DateRangeSelector
