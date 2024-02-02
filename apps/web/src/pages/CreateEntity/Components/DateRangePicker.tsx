import React, { useContext, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import {
  DateRangePicker,
  DayPickerRangeController,
  FocusedInputShape,
  OpenDirectionShape,
  OrientationShape,
} from 'react-dates'
import moment, { Moment } from 'moment'
import { DashboardThemeContext } from 'components/Dashboard/Dashboard'

const DISPLAY_FORMAT = 'DD-MMM-YYYY'

const Wrapper = styled.div<{ $isDark: boolean }>`
  .DateRangePickerInput {
    display: flex;
    justify-content: space-between;
    gap: 18px;
    background: transparent;

    .DateInput {
      width: 100%;
      background: transparent;

      &_input {
        font-family: ${(props): string => props.theme.primaryFontFamily};
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        height: 48px;
        padding: 6px 10px;
        border: 1px solid ${(props): string => props.theme.ixoNewBlue};
        border-radius: 8px;
        background: transparent;
        color: ${(props) => (!props.$isDark ? props.theme.ixoBlack : props.theme.ixoWhite)};

        &::placeholder {
          color: ${(props) => (!props.$isDark ? props.theme.ixoGrey500 : props.theme.ixoDarkBlue)};
        }
      }
    }
    &_arrow {
      display: none;
    }
  }
  // NOTE: the order of these styles DO matter

  // Will edit everything selected including everything between a range of dates
  .CalendarDay__selected_span {
    background: #a4ebff; //background
    color: white; //text
    border: 1px solid #a4ebff;
  }

  // Will edit selected date or the endpoints of a range of dates
  .CalendarDay__selected {
    background: ${(props) => props.theme.ixoNewBlue};
    color: white;
    border: 1px solid ${(props) => props.theme.ixoNewBlue};
  }

  // Will edit when the second date (end date) in a range of dates
  // is not yet selected. Edits the dates between your mouse and said date
  .CalendarDay__hovered_span:hover,
  .CalendarDay__hovered_span {
    background: #a4ebff;
  }
`

const DateRangePickerGlobalStyle = createGlobalStyle`
  .DateRangePicker_picker {
    z-index: 9999
  }
`

interface Props {
  input?: boolean
  id: string
  startDate: string
  endDate: string
  withPortal?: boolean
  openDirection?: OpenDirectionShape
  numberOfMonths?: number
  orientation?: OrientationShape
  onChange: (startDate: string, endDate: string) => void
}

const DateRangePickerComponent: React.FC<Props> = ({
  input = true,
  id,
  startDate,
  endDate,
  withPortal,
  openDirection = 'down',
  numberOfMonths = 2,
  orientation,
  onChange,
}): JSX.Element => {
  const { isDark } = useContext(DashboardThemeContext)
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(input ? null : 'startDate')

  return (
    <Wrapper $isDark={isDark}>
      <DateRangePickerGlobalStyle />
      {input ? (
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
          numberOfMonths={numberOfMonths}
          isOutsideRange={(): boolean => false}
          withPortal={withPortal}
          openDirection={openDirection}
          orientation={orientation}
          hideKeyboardShortcutsPanel
          noBorder
        />
      ) : (
        <DayPickerRangeController
          startDate={startDate ? moment(startDate) : null}
          endDate={endDate ? moment(endDate) : null}
          onDatesChange={({ startDate, endDate }): void => {
            onChange(startDate?.format(DISPLAY_FORMAT) ?? '', endDate?.format(DISPLAY_FORMAT) ?? '')
          }}
          focusedInput={focusedInput}
          onFocusChange={setFocusedInput}
          numberOfMonths={numberOfMonths}
          withPortal={withPortal}
          orientation={orientation}
          initialVisibleMonth={(): Moment => moment()}
          hideKeyboardShortcutsPanel
          noBorder
        />
      )}
    </Wrapper>
  )
}

export default DateRangePickerComponent
