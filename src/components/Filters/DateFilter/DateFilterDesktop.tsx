// import DatePicker from '../../DatePicker/DatePicker'
import { Props } from './types'
import { DatePickerModal, ButtonWrapper, ButtonOuter, ButtonInner, ButtonIcon } from '../Filters.styles'
import { Button, DateRangePicker } from 'pages/CreateEntity/Components'
import { FlexBox } from 'components/App/App.styles'

const DateFilterDesktop: React.FunctionComponent<Props> = ({
  startDate,
  endDate,
  isActive,
  dateSummary,
  handleFilterDateChange,
  handleFilterToggleShow,
  handleResetFilter,
}) => {
  return (
    <ButtonWrapper className={isActive ? 'active' : ''}>
      <ButtonOuter
        className={startDate && endDate ? 'itemsSelected' : ''}
        data-testid='DesktopDateButton'
        onClick={handleFilterToggleShow}
      >
        <ButtonInner>
          <ButtonIcon iconSize={16} className='icon-calendar-sort' />
          {dateSummary}
        </ButtonInner>
      </ButtonOuter>
      {isActive && (
        <DatePickerModal>
          {/* <DatePicker
            initialStartDate={startDate}
            initialEndDate={endDate}
            numberOfMonths={2}
            initialOrientation='horizontal'
            onApply={handleFilterToggleShow}
            onChange={handleFilterDateChange}
            onReset={handleResetFilter}
          /> */}
          <DateRangePicker
            id='date-filter'
            startDate={startDate || ''}
            endDate={endDate || ''}
            onChange={(startDate: string, endDate: string) => {
              handleFilterDateChange(startDate, endDate)
            }}
            input={false}
          />
          <FlexBox width='100%' alignItems='center' justifyContent='space-between'>
            <Button variant='secondary' onClick={handleResetFilter}>
              Reset
            </Button>
            <Button variant='primary' onClick={handleFilterToggleShow}>
              Done
            </Button>
          </FlexBox>
        </DatePickerModal>
      )}
    </ButtonWrapper>
  )
}

export default DateFilterDesktop
