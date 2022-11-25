import styled from 'styled-components'

export const Container = styled.div`
  --focus-standard-border: 1px solid ${(props): string => props.theme.highlight.light};
  .SingleDatePicker {
    z-index: 4;
  }
  .SingleDatePickerInput__withBorder {
    border: none;
    .DateInput {
      width: 20rem;
      position: relative;
      background: #f7f8f9;
      width: 100%;
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
        transform: translateY(-50%) rotate(-45deg);
      }
    }
    input.DateInput_input {
      border: none;
      margin: 0;
      width: 100%;
      background: #e8edee;
      border-radius: 4px;
      font-family: ${(props): string => props.theme.primaryFontFamily};
      font-style: normal;
      font-weight: normal;
      font-size: 1rem;
      ::placeholder {
        line-height: 1.5;
        color: #a5adb0;
      }
    }

    .DateInput .DateInput_input__focused {
      border: var(--focus-standard-border);
    }
  }
`

export const MobileWrapper = styled.div`
  &.active {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9;
    .SingleDatePicker .SingleDatePickerInput {
      .SingleDatePicker_picker {
        top: 0px !important;
      }
      .DayPicker .DayPicker_weekHeaders {
        .DayPicker_weekHeader {
          top: 1rem;
        }
      }
    }
    .DateInput {
      display: none;
    }
    .SingleDatePickerInput_clearDate {
      position: fixed;
      z-index: 10;
      right: 0;
      top: 0;
      transform: translateY(50%);
      background: none;
      svg {
        &.SingleDatePickerInput_clearDate_svg {
          display: none;
        }
      }
      ::after {
        content: 'Clear';
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.2;
        color: #a5adb0;
      }
    }
  }

  .SingleDatePicker {
    z-index: 6;
  }
  .SingleDatePickerInput__showClearDate {
    padding-right: 0;
    .SingleDatePickerInput_clearDate svg {
      &.SingleDatePickerInput_clearDate_svg {
        display: none;
        pointer-events: none;
        cursor: not-allowed;
      }
    }
  }

  .SingleDatePickerInput {
    .DateInput_fangStroke {
      display: none;
    }
  }
  .SingleDatePicker_picker {
    top: 1.875rem;
    width: 100vw;
    left: 0px;
    position: relative;
  }
  .DayPicker .DayPicker_transitionContainer__vertical {
    height: calc(100vh - 4.375rem) !important;
  }
  .CalendarMonthGrid .CalendarMonth .CalendarMonth_caption {
    font-weight: bold;
    font-size: 1rem;
    line-height: 1.2;
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
  position: relative;
  z-index: 5;
  top: 0;
  right: 6.25rem;
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
  .SingleDatePicker {
    .SingleDatePickerInput__showClearDate {
      padding-right: 0;
      .SingleDatePickerInput_clearDate {
        position: absolute;
        top: -9999px;
        left: -9999px;
      }
      svg {
        &.SingleDatePickerInput_clearDate_svg {
          display: none;
          pointer-events: none;
          cursor: not-allowed;
        }
      }
    }

    .SingleDatePicker_picker
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
        width: 0.5rem;
        height: 0.5rem;
        line-height: 0;
        font-size: 0;
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
        width: 0.5rem;
        height: 0.5rem;
        line-height: 0;
        font-size: 0;
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
      font-weight: bold;
      font-size: 1rem;
      line-height: 1.2;
      color: #000000;
      margin-top: 0.5rem;
    }
  }

  &.active .SingleDatePicker .SingleDatePickerInput {
    .SingleDatePickerInput_clearDate {
      background: transparent;
      padding: 0.5rem 0;
      border: none;
      position: absolute;
      top: calc(100% + 390px);
      left: 0.5rem;
      z-index: 4;
      text-align: left;
      border-radius: 0;
      ::after {
        content: 'Reset';
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.2;
        color: #000;
      }
    }
    .DateInput .DateInput_fang {
      display: none;
    }
  }
  .SingleDatePicker_picker {
    position: absolute;
    width: 38.75rem;
    height: 25rem;
    top: 4.125rem;
    left: 18.75rem !important;
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
