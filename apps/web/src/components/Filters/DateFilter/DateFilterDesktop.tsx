import { Props } from './types'
import { DatePickerModal, ButtonWrapper, ButtonOuter, ButtonInner, ButtonIcon } from '../Filters.styles'
import { Button, DateRangePicker } from 'pages/CreateEntity/Components'
import { FlexBox } from 'components/App/App.styles'
import { useEffect, useState } from 'react'

const DateFilterDesktop: React.FunctionComponent<Props> = ({
  startDate,
  endDate,
  isActive,
  dateSummary,
  handleFilterDateChange,
  handleFilterToggleShow,
  handleResetFilter,
}) => {
  const [_startDate, setStartDate] = useState('')
  const [_endDate, setEndDate] = useState('')

  useEffect(() => {
    setStartDate(startDate)
  }, [startDate])

  useEffect(() => {
    setEndDate(endDate)
  }, [endDate])

  function handleApply() {
    handleFilterDateChange(_startDate, _endDate)
    handleFilterToggleShow()
  }

  return (
    <ButtonWrapper className={isActive ? 'active' : ''}>
      <ButtonOuter
        className={startDate && endDate ? 'itemsSelected' : ''}
        data-testid='DesktopDateButton'
        onClick={handleFilterToggleShow}
      >
        <ButtonInner>
          <ButtonIcon $iconSize={16} className='icon-calendar-sort' />
          {dateSummary}
        </ButtonInner>
      </ButtonOuter>
      {isActive && (
        <DatePickerModal>
          <DateRangePicker
            id='date-filter'
            startDate={_startDate}
            endDate={_endDate}
            onChange={(startDate: string, endDate: string) => {
              setStartDate(startDate)
              setEndDate(endDate)
            }}
            input={false}
          />
          <FlexBox width='100%' $alignItems='center' $justifyContent='space-between'>
            <Button variant='secondary' onClick={handleResetFilter}>
              Reset
            </Button>
            <Button variant='primary' onClick={handleApply} disabled={!_startDate || !_endDate}>
              Done
            </Button>
          </FlexBox>
        </DatePickerModal>
      )}
    </ButtonWrapper>
  )
}

export default DateFilterDesktop
