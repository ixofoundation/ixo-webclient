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
      width: 100%;
      position: relative;
      background: #f7f8f9;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: calc(50% - 0.1875rem);
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
    input.DateInput_input {
      margin: 0;
      width: 100%;
      background: #e8edee;
      border-radius: 4px;
      font-family: ${(props): string => props.theme.primaryFontFamily};
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

  .DateRangePicker .DateRangePickerInput__showClearDates {
    padding-right: 0;
  }
  .DateRangePickerInput .DateRangePickerInput_clearDates svg {
    &.DateRangePickerInput_clearDates_svg {
      display: none;
    }
  }
  .DateRangePicker_picker {
    position: relative;
    width: 100vw;
    height: 100vh;
    top: 4px !important;
    left: 0px !important;
  }
  .DayPicker .DayPicker_weekHeaders {
    .DayPicker_weekHeader {
      top: 5rem;
    }
  }
  .DayPicker_transitionContainer__vertical {
    height: calc(100vh - 0px) !important;
    top: 4rem;
  }
  .CalendarMonthGrid .CalendarMonth .CalendarMonth_caption {
    font-family: ${(props): string => props.theme.primaryFontFamily};
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    margin-top: 2rem;
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

export const DesktopWrapper = styled.div`
  .DateRangePicker {
    .DateRangePickerInput__showClearDates {
      padding-right: 0;
      .DateRangePickerInput_clearDates {
        position: absolute;
        top: -9999px;
        left: -9999px;
      }
      svg {
        &.DateRangePickerInput_clearDates_svg {
          display: none;
          pointer-events: none;
          cursor: not-allowed;
        }
      }
    }
    .DateRangePicker_picker
      .DayPicker
      .DayPicker_focusRegion
      .DayPickerNavigation
      .DayPickerNavigation_leftButton__horizontalDefault {
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: calc(50% + 0.75rem);
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
        transform: translateY(-50%) rotate(45deg);
      }
    }
    .DayPickerNavigation_rightButton__horizontalDefault {
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: calc(50% + 0.75rem);
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
        transform: translateY(-50%) rotate(225deg);
      }
    }
    .DayPickerNavigation_button__default {
      border: none;
      .DayPickerNavigation_svg__horizontal {
        display: none;
      }
    }

    .CalendarMonthGrid .CalendarMonth_caption {
      font-family: ${(props): string => props.theme.primaryFontFamily};
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
      margin-top: 0.5rem;
    }
  }
  &.active .DateRangePicker .DateRangePickerInput {
    .DateRangePickerInput_clearDates {
      background: transparent;
      padding: 0.5rem 0;
      border: none;
      position: absolute;
      top: calc(100% + 320px);
      left: 0.5rem;
      z-index: 4;
      text-align: left;
      border-radius: 0;
      ::after {
        content: 'Reset';
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #000;
      }
    }
    .DateInput .DateInput_fang {
      display: none;
    }
  }
  .DateRangePicker_picker {
    position: absolute;
    width: 619px;
    height: 400px;
    top: 66px;
    left: 300px !important;
    background: #ffffff;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    transform: translate(-50%);
    z-index: 4;
    :after {
      content: '';
      position: absolute;
      top: -0.5rem;
      left: 8%;
      transform: translateX(-50%);
      height: 0;
      width: 0;
      border-radius: 4px;
      border-style: solid;
      border-width: 0 1rem 1.1rem 1rem;
      border-color: transparent transparent white transparent;
    }
  }
  .DayPicker .DayPicker_transitionContainer__horizontal {
    border-bottom: 1px solid #e8edee;
  }
  .DayPicker__withBorder {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`
