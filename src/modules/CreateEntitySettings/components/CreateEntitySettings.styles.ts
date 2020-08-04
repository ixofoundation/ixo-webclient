import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const FormWrapper = styled.div`
  .form-group .form-control {
    background-color: #e8edee;
    box-shadow: none;
  }
  .form-group .DateRangePicker .DateRangePickerInput__showClearDates {
    display: flex;
  }
  .form-group
    .active
    .DateRangePicker
    .DateRangePickerInput
    .DateRangePickerInput_clearDates {
    top: calc(100% + 396px);
  }

  .input-group input {
    width: initial;
    border-radius: 4px !important;
    @media (min-width: ${deviceWidth.mobileSmall}px) {
      margin-left: 0.625rem;
    }
  }
`
export const RemoveButton = styled.button`
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.2;
  border: none;
  background-color: transparent;
  color: #39c3e6;
`
