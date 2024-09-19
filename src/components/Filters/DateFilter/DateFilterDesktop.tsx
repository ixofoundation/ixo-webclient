import { Props } from './types'
import { DatePickerModal, ButtonWrapper, ButtonOuter, ButtonInner, ButtonIcon } from '../Filters.styles'
import { Button, DateRangePicker } from 'screens/CreateEntity/Components'
import { FlexBox } from 'components/CoreEntry/App.styles'
import { useEffect, useState, useRef } from 'react'
import { Typography } from 'components/Typography'

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
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setStartDate(startDate)
  }, [startDate])

  useEffect(() => {
    setEndDate(endDate)
  }, [endDate])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleFilterToggleShow() // Close the modal if clicking outside
      }
    }

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isActive, handleFilterToggleShow])

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
          <Typography size='md'>{dateSummary}</Typography>
        </ButtonInner>
      </ButtonOuter>
      {isActive && (
        <DatePickerModal ref={modalRef}>
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
