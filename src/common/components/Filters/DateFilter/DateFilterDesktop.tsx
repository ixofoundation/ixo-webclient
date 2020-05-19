import * as React from 'react'
import DatePicker from '../../DatePicker'
import CalendarSort from '../../../../assets/icons/CalendarSort'
import { Props } from './types'
import {
  DatePickerModal,
  ResetButtonDatePicker,
  ApplyButtonDatePicker,
  ButtonWrapper,
  Button,
} from '../Filters.styles'

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
    <ButtonWrapper>
      <Button
        className={startDate && endDate ? 'itemsSelected' : ''}
        data-testid="DesktopDateButton"
        onClick={handleFilterToggleShow}
      >
        <CalendarSort width="16" fill="#000" />
        {dateSummary}
      </Button>
      {isActive && (
        <DatePickerModal>
          <DatePicker
            initialStartDate={startDate}
            initialEndDate={endDate}
            initialOrientation="horizontal"
            onApply={handleFilterToggleShow}
            onChange={handleFilterDateChange}
            onReset={handleResetFilter}
          />
          <ResetButtonDatePicker onClick={handleResetFilter}>
            Reset
          </ResetButtonDatePicker>
          <ApplyButtonDatePicker onClick={handleFilterToggleShow}>
            Done
          </ApplyButtonDatePicker>
        </DatePickerModal>
      )}
    </ButtonWrapper>
  )
}

export default DateFilterDesktop
