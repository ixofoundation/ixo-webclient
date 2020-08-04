import styled from 'styled-components'
import { deviceWidth } from '../../../lib/commonData'

export const FormWrapper = styled.div`
  .form-group .active .SingleDatePicker .SingleDatePicker_picker {
    @media (min-width: ${deviceWidth.tablet}px) and (max-width: ${deviceWidth.desktop}px) {
      top: 120px !important;
      left: 15rem !important;
    }
  }
  .form-group select {
    background-color: #e8edee;
    box-shadow: none;
    border: none;
  }
`

export const RemoveButton = styled.button`
  border: none;
  color: #39c3e6;
  background: transparent;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.2;
`
