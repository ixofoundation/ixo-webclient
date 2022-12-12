import React, { useState } from 'react'
import styled from 'styled-components'
import { DateRangePicker, FocusedInputShape } from 'react-dates'
import moment from 'moment'

const DISPLAY_FORMAT = 'DD-MMM-YYYY'

const Wrapper = styled.div`
  .DateRangePickerInput {
    display: flex;
    justify-content: space-between;
    gap: 18px;

    .DateInput {
      width: 100%;
      &_input {
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        height: 44px;
        padding: 6px 10px;
        border: 1px solid ${(props): string => props.theme.ixoNewBlue};
        border-radius: 8px;
      }
    }
    .DateRangePicker_picker {
      z-index: 1000;
    }
    &_arrow {
      display: none;
    }
  }
`

interface Props {
  id: string
  startDate: string
  endDate: string
  onChange: (startDate: string, endDate: string) => void
}

const DateRangePickerComponent: React.FC<Props> = ({ id, startDate, endDate, onChange }): JSX.Element => {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null)

  return (
    <Wrapper>
      <DateRangePicker
        startDate={startDate ? moment(startDate) : null}
        startDateId={`start_${id}`}
        endDate={endDate ? moment(endDate) : null}
        endDateId={`end_${id}`}
        displayFormat={DISPLAY_FORMAT}
        onDatesChange={({ startDate, endDate }): void => {
          onChange(startDate?.format(DISPLAY_FORMAT) ?? '', endDate?.format(DISPLAY_FORMAT) ?? '')
        }}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        numberOfMonths={2}
        hideKeyboardShortcutsPanel={true}
        isOutsideRange={(): boolean => false}
        noBorder
      />
    </Wrapper>
  )
}

export default DateRangePickerComponent
