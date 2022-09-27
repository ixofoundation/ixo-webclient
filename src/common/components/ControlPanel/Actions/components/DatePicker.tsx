import React, { useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { SingleDatePicker } from 'react-dates'

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .SingleDatePickerInput {
    background: transparent;
    width: 100%;
    border: 1px solid ${(props): string => props.theme.ixoBlue};
    border-radius: 4px;

    .DateInput {
      background: transparent;
      width: 100%;

      &_input {
        background: transparent;
        padding: 10px;
        color: #ffffff;

        &::placeholder {
          color: #0e536b;
        }
      }
    }
  }
`
const StyledLabel = styled.label`
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  margin-bottom: 8px;
`
const StyledSingleDatePicker = styled(SingleDatePicker)``

interface Props {
  id?: string
  label: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

const DatePicker: React.FC<Props> = ({
  id,
  label,
  value,
  placeholder,
  onChange,
  ...rest
}): JSX.Element => {
  const [focused, setFocused] = useState(false)
  return (
    <DatePickerWrapper {...rest}>
      <StyledLabel>{label}</StyledLabel>
      <StyledSingleDatePicker
        id={id}
        date={value ? moment(value) : null}
        displayFormat="DD-MMM-YYYY"
        onDateChange={(date): void =>
          onChange(date ? date.format('DD-MMM-YYYY') : '')
        }
        focused={focused}
        onFocusChange={({ focused }): void => setFocused(focused)}
        isOutsideRange={(): boolean => false}
        numberOfMonths={1}
        orientation={'horizontal'}
        hideKeyboardShortcutsPanel={true}
        placeholder={placeholder}
        appendToBody={true}
        openDirection="up"
      />
    </DatePickerWrapper>
  )
}

export default DatePicker
