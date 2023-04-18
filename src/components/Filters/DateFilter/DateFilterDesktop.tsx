// import DatePicker from '../../DatePicker/DatePicker'
import { Props } from './types'
import {
  DatePickerModal,
  ResetButtonDatePicker,
  ApplyButtonDatePicker,
  ButtonWrapper,
  ButtonOuter,
  ButtonInner,
  ButtonIcon,
} from '../Filters.styles'
import { DateRangePicker } from 'pages/CreateEntity/Components'

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
          <ResetButtonDatePicker onClick={handleResetFilter}>Reset</ResetButtonDatePicker>
          <ApplyButtonDatePicker onClick={handleFilterToggleShow}>Done</ApplyButtonDatePicker>
        </DatePickerModal>
      )}
    </ButtonWrapper>
  )
}

export default DateFilterDesktop
