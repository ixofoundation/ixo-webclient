import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
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
        font-family: ${(props): string => props.theme.primaryFontFamily};
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        height: 44px;
        padding: 6px 10px;
        border: 1px solid ${(props): string => props.theme.ixoNewBlue};
        border-radius: 8px;
      }
    }
    &_arrow {
      display: none;
    }
  }
`

const DateRangePickerGlobalStyle = createGlobalStyle`
  .DateRangePicker_picker {
    z-index: 9999
  }
`

interface Props {
  id: string
  startDate: string
  endDate: string
  withPortal?: boolean
  onChange: (startDate: string, endDate: string) => void
}

const DateRangePickerComponent: React.FC<Props> = ({ id, startDate, endDate, withPortal, onChange }): JSX.Element => {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null)

  return (
    <Wrapper>
      <DateRangePickerGlobalStyle />
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
        withPortal={withPortal}
        noBorder
      />
    </Wrapper>
  )
}

export default DateRangePickerComponent
