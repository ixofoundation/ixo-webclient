import styled from 'styled-components'

export const Container = styled.div`
  .DateRangePicker .DateRangePicker_picker {
    z-index: 4;
  }
  .DateRangePickerInput__withBorder {
    border: none;
    background: #f7f8f9;

    .DateRangePickerInput_arrow {
      visibility: hidden;
      width: 1rem;
    }
    .DateInput {
      width: 17rem;
      position: relative;
      background: #f7f8f9;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        right: 0.5rem;
        border: 1px solid #000;
        border-width: 0 0 2px 2px;
        width: 8px;
        height: 8px;
        line-height: 0;
        font-size: 0;
        -webkit-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: translateY(-50%) rotate(-45deg);
      }
    }
    .DateInput_input {
      margin: 0;
      width: 100%;
      background: #e8edee;
      border-radius: 4px;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 1rem;

      &:after {
        content: '';
      }
    }
    .DateInput .DateInput_input__focused {
      border: var(--focus-standard-border);
    }
  }
`
