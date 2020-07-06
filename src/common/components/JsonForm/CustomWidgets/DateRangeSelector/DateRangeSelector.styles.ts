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
export const MobileWrapper = styled.div`
  &.active {
    display: flex;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9;
    .DateRangePicker .DateRangePickerInput .DateInput {
      display: none;
    }
    .DateRangePickerInput_clearDates {
      position: fixed;
      z-index: 10;
      right: 0px;
      top: 0;
      transform: translateY(50%);
      background: none;
      svg {
        &.DateRangePickerInput_clearDates_svg {
          display: none;
        }
      }
      ::after {
        content: 'Clear';
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #a5adb0;
      }
    }
  }
  .DateRangePicker .DateRangePickerInput .DateRangePicker_picker {
    position: relative;
    width: 100vw;
    height: 100vh;
    top: 4px !important;
    left: 0px !important;
  }
  .DayPicker .DayPicker_weekHeaders {
    .DayPicker_weekHeader {
      top: 122px;
    }
  }
  .DayPicker_transitionContainer__vertical {
    height: calc(100vh - 0px) !important;
    top: 4rem;
  }
`
export const MobileDateHeader = styled.header`
  width: 100vw;
  background: #002a3f;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  background-color: #002a3f;
  position: absolute;
  z-index: 5;
  top: 0;
  right: 100px;
  left: 0;
`
export const HeadingItem = styled.button`
  cursor: pointer;
  border: none;
  outline: none !important;
  text-decoration: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.3);
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 0;
`
