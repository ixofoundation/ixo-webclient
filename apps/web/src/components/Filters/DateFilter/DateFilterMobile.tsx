import { FlexBox } from 'components/App/App.styles'
import { Button, DateRangePicker } from 'screens/CreateEntity/Components'
import { useEffect, useState } from 'react'
import Back from '../../../assets/icons/Back'
import {
  MobileDateHeader,
  HeadingItem,
  MobileFilterModal,
  DateDisplay,
  DateInput,
  MobileDatePicker,
  MobileDatesMenu,
  ButtonOuter,
  ButtonInner,
  ButtonIcon,
} from '../Filters.styles'
import { Props } from './types'

interface MobileProps extends Props {
  startDateDisplay: string
  endDateDisplay: string
}

const DateFilterMobile: React.FunctionComponent<MobileProps> = ({
  startDate,
  endDate,
  startDateDisplay,
  endDateDisplay,
  dateSummary,
  isActive,
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
    <>
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
        <MobileDatesMenu className='openDatesMenu'>
          <MobileFilterModal>
            <MobileDateHeader>
              <HeadingItem onClick={handleFilterToggleShow}>
                <Back />
              </HeadingItem>
              <HeadingItem
                onClick={(): void => {
                  handleResetFilter()
                  handleFilterToggleShow()
                }}
              >
                clear
              </HeadingItem>
              <DateDisplay>
                <DateInput>{startDateDisplay}</DateInput>
                <Back fill='#436779' />
                <DateInput>{endDateDisplay}</DateInput>
              </DateDisplay>
            </MobileDateHeader>
            <MobileDatePicker>
              {/* <DateRangePicker
                id='date-filter-mobile'
                startDate={startDate || ''}
                endDate={endDate || ''}
                numberOfMonths={4}
                orientation='vertical'
                onChange={(startDate: string, endDate: string) => {
                  handleFilterDateChange(startDate, endDate)
                }}
              /> */}
              <DateRangePicker
                id='date-filter-mobile'
                startDate={_startDate}
                endDate={_endDate}
                onChange={(startDate: string, endDate: string) => {
                  setStartDate(startDate)
                  setEndDate(endDate)
                }}
                orientation='vertical'
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
            </MobileDatePicker>
          </MobileFilterModal>
        </MobileDatesMenu>
      )}
    </>
  )
}

export default DateFilterMobile
